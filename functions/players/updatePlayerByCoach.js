const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {USERS} = require("../utils/constants");


const updatePlayerByCoach = functions.firestore
  .document("users/{userId}/players/{playerId}")
  .onUpdate(async (change) => {
    const playerAfter = change.after.data();


    try {

        const playerRef = await admin.firestore().collection(USERS).where("email", "==", playerAfter.email).get()
        const player = playerRef.docs.map(doc => ({id: doc.id}))
        const playerId = player[0].id

        await admin.firestore().collection(USERS).doc(playerId).update({...playerAfter})

    } catch (err) {
      console.log(err);
    }
  });

module.exports = {
    updatePlayerByCoach,
};
