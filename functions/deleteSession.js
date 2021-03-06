const functions = require('firebase-functions');
const admin = require('firebase-admin');

const deleteSession = functions
  .region('europe-west2')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called while authenticated.',
      );
    }

    const payload = data;
    const {sessionId, internalId, allEvents} = payload;

    if (allEvents) {
      await admin
        .firestore()
        .collection('sessions')
        .where('internalId', '==', internalId)
        .get()
        .then(querySnapshot => {
          const batch = admin.firestore().batch();
          querySnapshot.forEach(doc => {
            batch.delete(doc.ref);
          });
          return batch.commit();
        });
    } else {
      await admin.firestore().collection('sessions').doc(sessionId).delete();
    }
  });

module.exports = {
  deleteSession,
};
