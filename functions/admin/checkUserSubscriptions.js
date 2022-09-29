const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {validateAndStoreReceipt} = require("../utils/validateAndStoreReceipt");
const {URL_IAP_PRODUCTION, USERS} = require("../utils/constants");

const checkUsersSubscriptions = functions.pubsub
    .schedule("every 1 minutes")
    .onRun(async () => {
      const usersRef = await admin.firestore().collection(USERS).get();
      usersRef.forEach((doc) => {
        const user = doc.data();

        const body = JSON.stringify({
          "receipt-data": user.appleSubscription.receipt,
          "password": functions.config().iap.token,
          "exclude-old-transactions": true,
        });

        validateAndStoreReceipt(URL_IAP_PRODUCTION, body, doc);
      });
    });

module.exports = {
  checkUsersSubscriptions,
};
