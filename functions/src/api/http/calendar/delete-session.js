const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {FB_REGION, SESSIONS, ACCOUNTING} = require("../../../utils/constants");

const deleteSession = functions
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
      const {sessionId, internalId, allEvents} = payload;

      await admin.firestore().collection(ACCOUNTING).where("sessionId", "==", sessionId).get().then((querySnapshot) => {
        const batch = admin.firestore().batch();
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      });

      if (allEvents) {
        await admin
            .firestore()
            .collection(SESSIONS)
            .where("internalId", "==", internalId)
            .get()
            .then((querySnapshot) => {
              const batch = admin.firestore().batch();
              querySnapshot.forEach(async (doc) => {
                await admin.firestore().collection(ACCOUNTING).where("sessionId", "==", doc.id).get()
                .then((querySnapshot) => {
                  const accountingBatch = admin.firestore().batch()
                  querySnapshot.forEach((doc) => {
                    accountingBatch.delete(doc.ref)
                  })
                  accountingBatch.commit()
                })
                batch.delete(doc.ref);
              });
              batch.commit();
            });
      } else {
        await admin.firestore().collection(SESSIONS).doc(sessionId).delete();
      }
    });

module.exports = {
  deleteSession,
};
