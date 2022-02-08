const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase_tools = require('firebase-tools');
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

exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    const {path} = data;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`,
    );

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });

    return {
      path: path,
    };
  });

async function validateAndStoreReceipt(url, body, userSnapshot) {
  console.log('[[VALIDATE AND STORE RECEIPT]]');
  return await axios
    .post(url, body)
    .then(result => {
      return result.data;
    })
    .then(data => {
      console.log('DATA', data);
      if (data.status === 21007) {
        // Retry with sandbox URL
        return validateAndStoreReceipt(
          'https://sandbox.itunes.apple.com/verifyReceipt',
          body,
          userSnapshot,
        );
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
      return userSnapshot.ref.update({
        status: status,
        appleSubscription: appleSubscription,
      });
    });
}

exports.validateReceipt = functions
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

    console.log('[[USER]]', userSnapshot.data());

    const body = JSON.stringify({
      'receipt-data': data.receipt,
      password: data.password,
      'exclude-old-transactions': true,
    });

    console.log('[[BODY]]', body);

    return validateAndStoreReceipt(
      'https://buy.itunes.apple.com/verifyReceipt',
      body,
      userSnapshot,
    );
  });
