const functions = require("firebase-functions");
const admin = require("firebase-admin");

const {FB_REGION,  USERS, PLAYERS} = require("../utils/constants");

const updatePlayer = functions
    .region(FB_REGION)
    .runWith({
      timeoutSeconds: 540,
      memory: "2GB",
    })
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "The function must be called while authenticated.",
        );
      }

      const payload = data;

      await admin.firestore().collection(USERS).doc(payload.id).update({...payload})

      if (payload.coachId) {
        const playerCoachRef = await admin.firestore().collection(USERS).doc(payload.coachId).collection(PLAYERS).where("email", "==", payload.email).get()
        const player = playerCoachRef.docs.map(doc => ({ id: doc.id}))
        
        const playerCoachId = player[0].id

        delete payload.id

        await admin.firestore().collection(USERS).doc(payload.coachId).collection(PLAYERS).doc(playerCoachId).update({...payload})

      }

    });

module.exports = {
    updatePlayer,
};
