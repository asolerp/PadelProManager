const functions = require('firebase-functions');
const firebase_tools = require('firebase-tools');

const recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    const {path} = data;

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called while authenticated.',
      );
    }

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });

    return {
      path: path,
    };
  });

module.exports = {
  recursiveDelete,
};
