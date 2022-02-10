const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {validateAndStoreReceipt} = require('./utils/validateAndStoreReceipt');
const {URL_IAP_PRODUCTION} = require('./utils/constants');

const validateReceipt = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    console.log('[[AUTH]]', context.auth.uid);

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called while authenticated.',
      );
    }
    console.log('[[RECEIPT]]', data.receipt);
    if (!data.receipt) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'receipt is required',
      );
    }

    // First we fetch the user
    const userSnapshot = await admin
      .firestore()
      .collection('users')
      .doc(context.auth.uid)
      .get();
    if (!userSnapshot.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'No user document found.',
      );
    }

    const body = JSON.stringify({
      'receipt-data': data.receipt,
      password: functions.config().iap.token,
      'exclude-old-transactions': true,
    });

    console.log('[[BODY]]', body);

    return validateAndStoreReceipt(URL_IAP_PRODUCTION, body, userSnapshot);
  });

module.exports = {
  validateReceipt,
};
