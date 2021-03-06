const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {firestore} = require('firebase-admin');
const {tennisGameLogic} = require('./utils/gameLogic');

const newPoint = functions
  .region('europe-west2')
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

    const {match, stats} = data;

    const newStateGame = tennisGameLogic(match?.game, stats?.winPointTeam);
    const matchQuery = admin.firestore().collection('matches').doc(match?.id);
    const historyQuery = admin
      .firestore()
      .collection('matches')
      .doc(match?.id)
      .collection('history');

    try {
      await historyQuery.add({
        ...stats,
        points: [...stats.points, {info: newStateGame?.info?.text || null}],
        date: new Date(),
        gameState: newStateGame,
      });

      if (newStateGame?.team1 === 3 && newStateGame?.team2 === 3) {
        await historyQuery.add({
          date: new Date(),
          alert: '¡Punto de oro!',
          type: 'warning',
        });
      }

      if (newStateGame?.winMatch) {
        await historyQuery.add({
          date: new Date(),
          alert: `Partido finalizado, Gana el equipo ${newStateGame?.winMatch}`,
          type: 'info',
        });
      }

      delete newStateGame.info;

      await matchQuery.update({
        game: newStateGame,
        [`statistics.s${newStateGame.set}.count`]:
          firestore.FieldValue.increment(1),
        ['statistics.total.count']: firestore.FieldValue.increment(1),
      });

      if (newStateGame?.team1 === 3 && newStateGame?.team2 === 3) {
        await matchQuery.update({
          [`statistics.s${newStateGame.set}.breakpoint`]:
            firestore.FieldValue.increment(1),
          ['statistics.total.breakpoint']: firestore.FieldValue.increment(1),
        });
      }

      if (match?.game?.team1 === 3 && match?.game?.team2 === 3) {
        await matchQuery.update({
          [`statistics.s${match?.game.set}.${stats?.winPointTeam}.global.breakpoint`]:
            firestore.FieldValue.increment(1),
          [`statistics.total.${stats?.winPointTeam}.global.breakpoint`]:
            firestore.FieldValue.increment(1),
        });
      }

      await Promise.all(
        stats?.points
          .filter(p => p?.player?.id)
          .map(
            async p =>
              await matchQuery.update({
                [`statistics.s${newStateGame.set}.${p?.team}.players.${p?.player?.id}.${p?.result}.${p?.point}`]:
                  firestore.FieldValue.increment(1),
                [`statistics.s${newStateGame.set}.${p?.team}.global.${p?.result}.${p?.point}`]:
                  firestore.FieldValue.increment(1),
                [`statistics.s${newStateGame.set}.${p?.team}.global.${p?.result}.count`]:
                  firestore.FieldValue.increment(1),
                [`statistics.total.${p?.team}.players.${p?.player?.id}.${p?.result}.count`]:
                  firestore.FieldValue.increment(1),
                [`statistics.total.${p?.team}.players.${p?.player?.id}.${p?.result}.${p?.point}`]:
                  firestore.FieldValue.increment(1),
                [`statistics.total.${p?.team}.global.${p?.result}.${p?.point}`]:
                  firestore.FieldValue.increment(1),
                [`statistics.total.${p?.team}.global.${p?.result}.count`]:
                  firestore.FieldValue.increment(1),
              }),
          ),
      );
    } catch (err) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Something were wrong.',
      );
    }
  });

module.exports = {
  newPoint,
};
