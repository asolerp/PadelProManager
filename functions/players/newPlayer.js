const functions = require('firebase-functions');
const admin = require('firebase-admin');

const newPlayer = functions
  .region('europe-west2')
  .firestore.document('users/{userId}/players/{playerId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const playerEmail = data?.email;

    try {
      const coachRes = await admin
        .firestore()
        .collection('users')
        .doc(context?.params?.userId)
        .get();

      const coach = {...coachRes.data(), id: coachRes.id};

      await admin.firestore().collection('relations').add({
        coach,
        playerEmail,
        status: 'pending',
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = {
  newPlayer,
};
