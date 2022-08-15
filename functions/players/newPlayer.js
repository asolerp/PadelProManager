const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {USERS, RELATIONS} = require('../utils/constants');

const newPlayer = functions.firestore
  .document('users/{userId}/players/{playerId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const playerEmail = data?.email;

    try {
      const coachRes = await admin
        .firestore()
        .collection(USERS)
        .doc(context?.params?.userId)
        .get();

      const coach = {...coachRes.data(), id: coachRes.id};

      await admin.firestore().collection(RELATIONS).add({
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
