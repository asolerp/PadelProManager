const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FB_REGION, USERS, PLAYERS } = require("../utils/constants");

const leaveCoach = functions
.region(FB_REGION)
.runWith({
  timeoutSeconds: 540,
  memory: "2GB",
})
.https.onCall(async (data,) => {
    const {coachId, playerId, playerEmail} = data;
    try {
        const playerCoachEmailQuery = await admin.firestore().collection(USERS).doc(coachId).collection(PLAYERS).where("email", "==", playerEmail).get()
        const playerDocs = playerCoachEmailQuery.docs.map(d => ({id: d.id, ...d.data()}))

        await admin.firestore().collection(USERS).doc(coachId).collection(PLAYERS).doc(playerDocs[0].id).update({active: false}) 
        
        console.log("PLAYER EMAIL", playerEmail)
        await admin.firestore().collection(USERS).doc(playerId).update({
            coachId: admin.firestore.FieldValue.delete()
        })
    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = {
    leaveCoach,
};
