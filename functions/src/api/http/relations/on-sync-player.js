const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FB_REGION, USERS,  COAH_REQUESTS } = require("../../../utils/constants");

const onSyncPlayer = functions
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

    const {syncCode, playerId} = data;

    console.log("[[CODE]]", syncCode)

    try {

        const coachRequestsRef = admin
        .firestore()
        .collection(COAH_REQUESTS)
        .where("code", "==", Number(syncCode))

        const coachRequestsQuery = await coachRequestsRef.get()
        const coachRequestsDocs = coachRequestsQuery.docs.map(d => d.data())
        
        if (coachRequestsDocs.length === 0) {
            throw new Error("syncCoach/no-code")
        }

        await admin.firestore().collection(USERS).doc(playerId).update({
            coachId: coachRequestsDocs?.[0]?.coachId,
            coachEmail: coachRequestsDocs?.[0]?.coachEmail
        })


    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = {
    onSyncPlayer,
};
