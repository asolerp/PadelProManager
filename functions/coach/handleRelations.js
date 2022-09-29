const functions = require("firebase-functions");
const admin = require("firebase-admin");

const handleRelations = functions.firestore
    .document("relations/{relationId}")
    .onUpdate(async (change) => {
      const relationAfter = change.after.data();

      if (relationAfter?.status === "accepted") {
        try {
          const userRef = await admin
              .firestore()
              .collection("users")
              .where("email", "==", relationAfter?.playerEmail)
              .get();

          const userId = userRef.docs?.[0]?.id;

          await admin
              .firestore()
              .collection("users")
              .doc(userId)
              .update({coachId: relationAfter?.coach?.id});
        } catch (err) {
          console.log(err);
        }
      }
    });

module.exports = {
  handleRelations,
};
