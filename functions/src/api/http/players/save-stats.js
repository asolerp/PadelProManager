const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {getStatsUpdateObject} = require("../../../utils/getStatsUpdateObject");
const {
  USERS,
  PLAYERS,
  FB_REGION,
  MATCHES,
  STATS,
} = require("../../../utils/constants");

const findPlayerEmailById = async (userId, playerId) => {
  const player = await admin
    .firestore()
    .collection(USERS)
    .doc(userId)
    .collection(PLAYERS)
    .doc(playerId)
    .get();

  return player?.data()?.email;
};

const savePlayersStats = functions
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

    const userId = context.auth.uid;
    const batch = admin.firestore().batch();
    const statsBatch = admin.firestore().batch();

    const {playersStats, matchId} = data;
    const team1Stats = playersStats?.team1;
    const team2Stats = playersStats?.team2;

    const matchRef = admin.firestore().collection(MATCHES).doc(matchId);
    const statsRef = playerEmail =>
      admin
        .firestore()
        .collection(STATS)
        .doc(playerEmail)

    batch.update(matchRef, {state: "finished"});

    try {
      team1Stats?.players &&
        (await Promise.all(
          Object.entries(team1Stats?.players).map(async ([key, value]) => {

            const playerEmail = await findPlayerEmailById(userId, key);
            const statsPlayer = await statsRef(playerEmail).get()

            if (statsPlayer.exists) {
              statsBatch.update(statsRef(playerEmail), getStatsUpdateObject(value));
            } else {
              statsBatch.set(statsRef(playerEmail), getStatsUpdateObject(value));
            }
          }),
        ));

      team2Stats?.players &&
        (await Promise.all(
          Object.entries(team2Stats?.players).map(async ([key, value]) => {
            
            const playerEmail = await findPlayerEmailById(userId, key);
            const statsPlayer = await statsRef(playerEmail).get()

            if (statsPlayer.exists) {
                statsBatch.update(statsRef(playerEmail), getStatsUpdateObject(value));
              } else {
                statsBatch.set(statsRef(playerEmail), getStatsUpdateObject(value));
              }
          }),
        ));
      await batch.commit();
      await statsBatch.commit();
    } catch (err) {
      console.log(err);
    }
  });

module.exports = {
  savePlayersStats,
};
