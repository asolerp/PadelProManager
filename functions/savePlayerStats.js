const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getStatsUpdateObject} = require('./utils/getStatsUpdateObject');

const savePlayersStats = functions
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

module.exports = {
  savePlayersStats,
};
