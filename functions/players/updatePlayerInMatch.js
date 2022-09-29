const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {MATCHES} = require("../utils/constants");

const updatePlayerInMatch = functions.firestore
  .document("players/{playerId}")
  .onUpdate(async (change, context) => {
    const playerAfter = change.after.data();
    // Create a new batch instance
    const batch = admin.firestore().batch();

    try {
      const querySnapshot = await admin
        .firestore()
        .collection(MATCHES)
        .where("playersId", "array-contains", context.params.playerId)
        .get();
      querySnapshot.forEach(doc => {
        const match = doc.data();

        const indexT1 = match?.t1?.findIndex(
          p => p?.id === context.params.playerId,
        );
        const indexT2 = match?.t2?.findIndex(
          p => p?.id === context.params.playerId,
        );
        indexT1 !== -1
          ? (match.t1[indexT1] = {
              ...playerAfter,
              id: context.params.playerId,
            })
          : (match.t2[indexT2] = {
              ...playerAfter,
              id: context.params.playerId,
            });
        const docRef = admin.firestore().collection(MATCHES).doc(doc.id);
        batch.update(docRef, match);
      });
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });

module.exports = {
  updatePlayerInMatch,
};
