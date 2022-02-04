const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {firestore} = require('firebase-admin');
const {getStatsUpdateObject} = require('./utils/getStatsUpdateObject');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

exports.savePlayersStats = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async data => {
    const {playersStats, matchId, date} = data;

    const team1Stats = playersStats?.team1;
    const team2Stats = playersStats?.team2;

    try {
      await Promise.all([
        await admin
          .firestore()
          .collection('matches')
          .doc(matchId)
          .update({state: 'finished'}),
        team1Stats?.players &&
          Object.entries(team1Stats?.players).map(async ([key, value]) => {
            await admin
              .firestore()
              .collection('players')
              .doc(key)
              .collection('stats')
              .doc('global')
              .update(getStatsUpdateObject(value));
          }),
        team2Stats?.players &&
          Object.entries(team2Stats?.players).map(async ([key, value]) => {
            await admin
              .firestore()
              .collection('players')
              .doc(key)
              .collection('stats')
              .doc('global')
              .update(getStatsUpdateObject(value));
          }),
        team1Stats?.players &&
          Object.entries(team1Stats?.players).map(async ([key, value]) => {
            await admin
              .firestore()
              .collection('players')
              .doc(key)
              .collection('history')
              .add({
                ...value,
                date: date,
              });
          }),
        team2Stats?.players &&
          Object.entries(team2Stats?.players).map(async ([key, value]) => {
            await admin
              .firestore()
              .collection('players')
              .doc(key)
              .collection('history')
              .add({
                ...value,
                date: date,
              });
          }),
      ]);
    } catch (err) {
      throw error;
    }
  });

exports.updatePlayerInMatch = functions.firestore
  .document('players/{playerId}')
  .onUpdate(async (change, context) => {
    const playerAfter = change.after.data();
    // Create a new batch instance
    const batch = admin.firestore().batch();

    try {
      const querySnapshot = await admin
        .firestore()
        .collection('matches')
        .where('playersId', 'array-contains', context.params.playerId)
        .get();
      querySnapshot.forEach(doc => {
        const match = doc.data();

        const indexT1 = match?.t1?.findIndex(
          p => p?.id === context.params.playerId,
        );
        const indexT2 = match?.t2?.findIndex(
          p => p?.id === context.params.playerId,
        );
        console.log(indexT1, indexT2, '[[INDEXS]]');
        indexT1 !== -1
          ? (match.t1[indexT1] = {
              ...playerAfter,
              id: context.params.playerId,
            })
          : (match.t2[indexT2] = {
              ...playerAfter,
              id: context.params.playerId,
            });
        const docRef = admin.firestore().collection('matches').doc(doc.id);
        batch.update(docRef, match);
      });
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });

exports.validateReceipt = functions.https.onCall(async d => {
  const data = JSON.stringify({
    'receipt-data': d['receipt-data'],
    password: d.password,
    'exclude-old-transactions': true,
  });

  console.log('[[BODY]]', d);

  const result = await axios.post(
    'https://sandbox.itunes.apple.com/verifyReceipt',
    data,
  );

  console.log('[[RESULT]]', result.data);

  const receiptData = result.data.latest_receipt_info[0];
  const expiry = receiptData.expires_date_ms;

  console.log('EXPIRY', expiry);

  const expired = Date.now() > expiry;

  console.log('EXPIRED', expired);

  return {
    isExpired: expired,
  };
});
