const axios = require('axios');
const {URL_IAP_TEST} = require('./constants');

const validateAndStoreReceipt = async (url, body, userSnapshot) => {
  console.log('[[VALIDATE AND STORE RECEIPT]]');
  return await axios
    .post(url, body)
    .then(result => {
      return result.data;
    })
    .then(data => {
      if (data.status === 21007) {
        // Retry with sandbox URL
        return validateAndStoreReceipt(URL_IAP_TEST, body, userSnapshot);
      }
      // Process the result
      if (data.status !== 0) {
        return false;
      }

      const latestReceiptInfo = data.latest_receipt_info[0];
      const expireDate = Number(latestReceiptInfo.expires_date_ms);
      const isSubscribed = expireDate > Date.now();

      const status = {
        isSubscribed: isSubscribed,
        expireDate: expireDate,
      };

      const appleSubscription = {
        receipt: data.latest_receipt,
        productId: latestReceiptInfo.product_id,
        originalTransactionId: latestReceiptInfo.original_transaction_id,
      };

      // Update the user document!
      userSnapshot.ref.update({
        status: status,
        appleSubscription: appleSubscription,
      });

      return {
        status,
      };
    });
};

module.exports = {
  validateAndStoreReceipt,
};
