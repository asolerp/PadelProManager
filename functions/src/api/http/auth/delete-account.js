const functions = require("firebase-functions");
const {FB_REGION, USERS} = require("../../../utils/constants");
const admin = require("firebase-admin");

const deleteAccount = functions
    .region(FB_REGION)
    .runWith({
      timeoutSeconds: 540,
      memory: "2GB",
    })
    .https.onCall(async (_,context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "The function must be called while authenticated.",
        );
      }

      const uid = context.auth.uid

      await admin.auth().deleteUser(uid)
      await admin.firestore().collection(USERS).doc(uid).delete()

    });

module.exports = {
    deleteAccount,
};
