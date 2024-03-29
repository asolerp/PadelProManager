const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FB_REGION, USERS, STATS, GLOBAL } = require("../../../utils/constants");
const { emptyStats } = require("../../../utils/emptyStats");

const DEFAULT_PHOTOURL =
  "https://res.cloudinary.com/enalbis/image/upload/v1665611656/PadelPro/varios/ox3kmudzjq4o9lb0xvvw.png";


const checkNewUser = functions
.region(FB_REGION)
.runWith({
  timeoutSeconds: 540,
  memory: "2GB",
})
.https.onCall(async (data,context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "The function must be called while authenticated.",
    );
  }

    const {user, role} = data;
 
    try {
      
      const userRef = admin.firestore().collection(USERS)
      const userQuery = await userRef.doc(user?.uid).get()

      // const requestRef = admin.firestore().collection(REQUESTS)
      // const requestQuery = await requestRef.where("playerEmail", "==", user?.email).get();

      // const requestDocs = requestQuery.docs.map((d) => {
      // if (d.exists) {
      //   return {
      //     id: d.id, ...d.data()
      //   }
      // }
      // });

      if (userQuery.exists) {
        const userData = userQuery.data()
         if (userData.role === "player") {
          //  if (requestDocs.length > 0) {
          //   await userRef.doc(user.uid).update({
          //     coachId: requestDocs?.[0]?.coachId,
          //     coachEmail: requestDocs?.[0]?.coachEmail,
          //     updatedAt: new Date()
          //   })
          //   await requestRef.doc(requestDocs?.[0]?.id).delete()
          //  }
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
          firstName: user?.firstName,
          secondName: user?.secondName,
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

      // if (requestDocs.length > 0) {

      //   const newPlayer = {
      //     email: user.email,
      //     coachId: requestDocs?.[0]?.coachId,
      //     coachEmail: requestDocs?.[0]?.coachEmail,
      //     role: "player",
      //     profileImg: user.photoURL || DEFAULT_PHOTOURL,
      //   }

      //   const playerRef = admin.firestore().collection(USERS).doc(requestDocs?.[0]?.coachId).collection(PLAYERS)
      //   const playerInfoQuery = await playerRef.where("email", "==", user.email).get()
      //   const playerInfoDocs =  playerInfoQuery.docs.map(d => ({id: d.id, ...d.data()}))
      //   const player = playerInfoDocs[0]

      //   await playerRef.doc(player.id).update({
      //     active: true
      //   })

      //   const { firstName: firstNamePlayer, secondName: secondNamePlayer, age, category, gender, phone } = player

      //   await requestRef.doc(requestDocs?.[0]?.id).delete()

      //   await userRef.doc(user?.uid).set({
      //       ...newPlayer,
      //       firstName: firstNamePlayer,
      //       secondName: secondNamePlayer,
      //       createdAt: new Date(),
      //       age,
      //       category, 
      //       gender,
      //       phone,
      //     });
  
      //     await userRef
      //       .doc(user.uid)
      //       .collection(STATS)
      //       .doc(GLOBAL)
      //       .set({...emptyStats});

      //       return {
      //         ...newPlayer,
      //         id: user?.uid,
              
      //       }
      // } else {

        const newPlayerWithoutCoach = {
          email: user?.email,
          firstName: user?.firstName,
          secondName: user?.secondName,
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

      // }

    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = {
    checkNewUser,
};
