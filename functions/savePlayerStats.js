const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getStatsUpdateObject} = require('./utils/getStatsUpdateObject');

const findPlayerEmailById = async (userId, playerId) => {
  const player = await admin
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('players')
    .doc(playerId)
    .get();

  return player?.data()?.email;
};

const findUserIdByEmail = async email => {
  const user = await admin
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .get();

  return user?.docs.length > 0 ? user.docs[0].id : null;
};

const savePlayersStats = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called while authenticated.',
      );
    }

    const userId = context.auth.uid;
    const batch = admin.firestore().batch();
    const userBatch = admin.firestore().batch();

    const {playersStats, matchId} = data;
    const team1Stats = playersStats?.team1;
    const team2Stats = playersStats?.team2;

    const matchRef = admin.firestore().collection('matches').doc(matchId);
    const coachPlayerRef = playerId =>
      admin
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('players')
        .doc(playerId)
        .collection('stats')
        .doc('global');

    const userRef = id =>
      admin
        .firestore()
        .collection('users')
        .doc(id)
        .collection('stats')
        .doc('global');

    batch.update(matchRef, {state: 'finished'});

    try {
      team1Stats?.players &&
        (await Promise.all(
          Object.entries(team1Stats?.players).map(async ([key, value]) => {
            const playerEmail = await findPlayerEmailById(userId, key);
            const id = await findUserIdByEmail(playerEmail);
            if (id) {
              userBatch.update(userRef(id), getStatsUpdateObject(value));
            }
            batch.update(coachPlayerRef(key), getStatsUpdateObject(value));
          }),
        ));

      team2Stats?.players &&
        (await Promise.all(
          Object.entries(team2Stats?.players).map(async ([key, value]) => {
            const playerEmail = await findPlayerEmailById(userId, key);
            const id = await findUserIdByEmail(playerEmail);
            if (id) {
              userBatch.update(userRef(id), getStatsUpdateObject(value));
            }
            batch.update(coachPlayerRef(key), getStatsUpdateObject(value));
          }),
        ));
      await batch.commit();
      await userBatch.commit();
    } catch (err) {
      console.log(err);
    }
  });

module.exports = {
  savePlayersStats,
};
