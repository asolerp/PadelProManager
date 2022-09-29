const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {validateAndStoreReceipt} = require("../utils/validateAndStoreReceipt");
const {URL_IAP_PRODUCTION, FB_REGION, USERS} = require("../utils/constants");

const validateReceipt = functions
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

      if (!data.receipt) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "receipt is required",
        );
      }

      // First we fetch the user
      const userSnapshot = await admin
          .firestore()
          .collection(USERS)
          .doc(context.auth.uid)
          .get();
      if (!userSnapshot.exists) {
        throw new functions.https.HttpsError(
            "not-found",
            "No user document found.",
        );
      }

      const body = JSON.stringify({
        "receipt-data": data.receipt,
        "password": functions.config().iap.token,
        "exclude-old-transactions": true,
      });

      const result = await validateAndStoreReceipt(
          URL_IAP_PRODUCTION,
          body,
          userSnapshot,
      );

      return result;
    });

module.exports = {
  validateReceipt,
};
