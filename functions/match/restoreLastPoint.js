const functions = require("firebase-functions");

const {FB_REGION} = require("../utils/constants");

const newPoint = functions
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
  });

module.exports = {
  newPoint,
};
