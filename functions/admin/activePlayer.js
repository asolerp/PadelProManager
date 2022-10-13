const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { USERS, PLAYERS } = require("../utils/constants");


const activePlayer = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap,) => {

    const user = snap.data();
    const { coachId, email } = user

    const coachRef =  admin.firestore().collection(USERS).doc(coachId)
    const coachPlayersRef = coachRef.collection(PLAYERS)

    const coachPlayerQuery = await coachPlayersRef.where("email", "==", email).get()
    const coachPlayerRes = coachPlayerQuery.docs.map(doc => ({id: doc.id, ...doc.data()}))

    const playerCoachId = coachPlayerRes[0].id

    await coachRef.collection(PLAYERS).doc(playerCoachId).update({
        active: true
    })
    
  });

module.exports = {
    activePlayer,
};
