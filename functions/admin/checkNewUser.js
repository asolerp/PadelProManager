const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FB_REGION, REQUESTS, USERS, STATS, GLOBAL, PLAYERS } = require("../utils/constants");
const { emptyStats } = require("../utils/emptyStats");

const DEFAULT_PHOTOURL =
  "https://res.cloudinary.com/enalbis/image/upload/v1665611656/PadelPro/varios/ox3kmudzjq4o9lb0xvvw.png";


const checkNewUser = functions
.region(FB_REGION)
.runWith({
  timeoutSeconds: 540,
  memory: "2GB",
})
.https.onCall(async (data,) => {
    const {user, token, role} = data;

    console.log("USER.ID", user?.uid)
    console.log("USER.EMAIL", user?.email)


    const userRef = admin.firestore().collection(USERS)

    try {

      const userQuery = await admin.firestore().collection(USERS).doc(user?.uid).get()

      const requestRef = admin.firestore().collection(REQUESTS)
      const requestQuery = await requestRef.where("playerEmail", "==", user?.email).get();

      const requestDocs = requestQuery.docs.map((d) => ({id: d.id, ...d.data()}));

      if (userQuery.exists) {
        const userData = userQuery.data()
         if (userData.role === "coach") {
            await userRef.doc(user.uid).update({token, updatedAt: new Date()})
         } else {
           if (requestDocs.length > 0) {
              if (!requestDocs[0].active) {
                await userRef.doc(user.uid).update({
                  coachId: requestDocs?.[0]?.coachId,
                  coachEmail: requestDocs?.[0]?.coachEmail,
                  token,
                  updatedAt: new Date()
                })
                await requestRef.doc(requestDocs?.[0]?.id).update({
                  active: true
                })
              }
           }
           await userRef.doc(user.uid).update({token, updatedAt: new Date()})
         }

         const userDoc = await userRef.doc(user?.uid).get()

         return {
          id: userDoc.id,
          ...userDoc.data()
        }
      }

      if (role === "coach") {

        const newCoach = {
          email: user?.email,
          profileImg: user?.photoURL || DEFAULT_PHOTOURL,
          createdAt: new Date(),
          role: "coach"
        }

        await userRef.doc(user?.uid).set(newCoach)

        return {
          ...newCoach,
          id: user?.uid,
        }

      }

      if (requestDocs.length > 0) {

        const newPlayer = {
          email: user.email,
          coachId: requestDocs?.[0]?.coachId,
          coachEmail: requestDocs?.[0]?.coachEmail,
          token,
          role: "player",
          profileImg: user.photoURL || DEFAULT_PHOTOURL,
        }

        const playerInfoQuery = await admin.firestore().collection(USERS).doc(requestDocs?.[0]?.coachId).collection(PLAYERS).where("email", "==", user.email).get()
        const playerInfoDocs =  playerInfoQuery.docs.map(d => ({id: d.id, ...d.data()}))
        const player = playerInfoDocs[0]

        console.log("PLAYER", player)

        const { firstName, secondName, age, category, gender, phone } = player

        await requestRef.doc(requestDocs?.[0]?.id).update({
          active: true
        })
        await userRef.doc(user?.uid).set({
            ...newPlayer,
            firstName,
            secondName,
            createdAt: new Date(),
            age,
            category, 
            gender,
            phone,
          });
  
          await userRef
            .doc(user.uid)
            .collection(STATS)
            .doc(GLOBAL)
            .set({...emptyStats});

            return {
              ...newPlayer,
              id: user?.uid,
              
            }
      } else {

        const newPlayerWithoutCoach = {
          email: user?.email,
          profileImg: user?.photoURL || DEFAULT_PHOTOURL,
          createdAt: new Date(),
          role: "player"
        }

        await userRef.doc(user?.uid).set(newPlayerWithoutCoach)

        await userRef
        .doc(user.uid)
        .collection(STATS)
        .doc(GLOBAL)
        .set({...emptyStats});

        return {
          ...newPlayerWithoutCoach,
          id: user?.uid,
        }

      }

    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = {
    checkNewUser,
};
