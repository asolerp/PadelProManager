const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {firestore} = require("firebase-admin");
const {tennisGameLogic} = require("../utils/gameLogic");
const {FB_REGION, MATCHES, HISTORY} = require("../utils/constants");

const newPoint = functions
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

    const {match, stats} = data;

    const newStateGame = tennisGameLogic(match?.game, stats?.winPointTeam);
    const matchRef = admin.firestore().collection(MATCHES).doc(match?.id);
    const historyQuery = admin
      .firestore()
      .collection(MATCHES)
      .doc(match?.id)
      .collection(HISTORY);

    try {
      await historyQuery.add({
        ...stats,
        points: [...stats.points, {info: newStateGame?.info?.text || null}],
        date: new Date(),
        gameState: newStateGame,
      });

      if (
        newStateGame?.team1 === 3 &&
        newStateGame?.team2 === 3 &&
        newStateGame?.goldPoint
      ) {
        await historyQuery.add({
          date: new Date(),
          alert: "¡Punto de oro!",
          type: "warning",
        });
      }

      if (newStateGame?.winMatch) {
        await historyQuery.add({
          date: new Date(),
          alert: `Partido finalizado, Gana el equipo ${newStateGame?.winMatch}`,
          type: "info",
        });
      }

      delete newStateGame.info;

 
      // if (newStateGame?.team1 === 3 && newStateGame?.team2 === 3) {
      //   batchMatch.update(matchRef,{
      //     [`statistics.s${newStateGame.set}.breakpoint`]:
      //       firestore.FieldValue.increment(1),
      //     ["statistics.total.breakpoint"]: firestore.FieldValue.increment(1),
      //   });
      // }

      // if (
      //   match?.game?.team1 === 3 &&
      //   match?.game?.team2 === 3 &&
      //   match?.game?.goldPoint
      // ) {
      //   if (match?.game.service === "t1" && stats?.winPointTeam === "team1") {
      //      batchMatch.update(matchRef, {
      //       [`statistics.s${match?.game.set}.team1.global.serviceBreakpoint`]:
      //         firestore.FieldValue.increment(1),
      //       ["statistics.total.team1.global.serviceBreakpoint"]:
      //         firestore.FieldValue.increment(1),
      //     });
      //   }
      //   if (match?.game.service === "t2" && stats?.winPointTeam === "team1") {
      //     batchMatch.update(matchRef, {
      //       [`statistics.s${match?.game.set}.team1.global.returningBreakpoint`]:
      //         firestore.FieldValue.increment(1),
      //       ["statistics.total.team1.global.returningBreakpoint"]:
      //         firestore.FieldValue.increment(1),
      //     });
      //   }
      //   if (match?.game.service === "t1" && stats?.winPointTeam === "team2") {
      //     batchMatch.update(matchRef, {
      //       [`statistics.s${match?.game.set}.team2.global.returningBreakpoint`]:
      //         firestore.FieldValue.increment(1) || 1,
      //       ["statistics.total.team2.global.returningBreakpoint"]:
      //         firestore.FieldValue.increment(1) || 1,
      //     });
      //   }
      //   if (match?.game.service === "t2" && stats?.winPointTeam === "team2") {
      //     batchMatch.update(matchRef, {
      //       [`statistics.s${match?.game.set}.team2.global.serviceBreakpoint`]:
      //         firestore.FieldValue.increment(1) || 1,
      //       ["statistics.total.team2.global.serviceBreakpoint"]:
      //         firestore.FieldValue.increment(1) || 1,
      //     });
      //   }
      //   batchMatch.update(matchRef, {
      //     [`statistics.s${match?.game.set}.${stats?.winPointTeam}.global.breakpoint`]:
      //       firestore.FieldValue.increment(1),
      //     [`statistics.total.${stats?.winPointTeam}.global.breakpoint`]:
      //       firestore.FieldValue.increment(1),
      //   });
      // }

        await Promise.all(stats?.points
          .map(async p => {
              console.log("RESULT", p?.result)
              if (!p.result) {
                if(match?.game?.lastPointWon === "team1" && !p?.result) {
                  return await matchRef.update({
                    ["statistics.total.team1.global.wNs.count"]:
                    firestore.FieldValue.increment(1),
                    ["statistics.total.team2.global.lNs.count"]:
                    firestore.FieldValue.increment(1),
                    [`statistics.s${newStateGame.set}.team1.global.wNs.count`]:
                    firestore.FieldValue.increment(1),
                    [`statistics.s${newStateGame.set}.team2.global.lNs.count`]:
                    firestore.FieldValue.increment(1),
                  })
                }
  
                if(match?.game?.lastPointWon === "team2" && !p?.result) {
                  return await matchRef.update({
                    ["statistics.total.team1.global.lNs.count"]:
                    firestore.FieldValue.increment(1),
                    ["statistics.total.team2.global.wNs.count"]:
                    firestore.FieldValue.increment(1),
                    [`statistics.s${newStateGame.set}.team1.global.lNs.count`]:
                    firestore.FieldValue.increment(1),
                    [`statistics.s${newStateGame.set}.team2.global.wNs.count`]:
                    firestore.FieldValue.increment(1),
                  })
                }
              } else {
                 return await matchRef.update({
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
               })
              }
            }
          ))

        if (
          newStateGame?.consecutiveWon >
          match?.statistics?.total?.[newStateGame?.lastPointWon].global?.consecutiveWon || 0
        ) {
          await matchRef.update({
            [`statistics.total.${newStateGame?.lastPointWon}.global.consecutiveWon`]:
              newStateGame?.consecutiveWon,
          });
        }

        await matchRef.update({
          [`statistics.s${newStateGame.set}.count`]:
            firestore.FieldValue.increment(1),
          ["statistics.total.count"]: firestore.FieldValue.increment(1),
        });

        await matchRef.update({
          game: newStateGame,
        });

    } catch (err) {
      console.log("ERROR", err)
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Something were wrong.",
      );
    }
  });

module.exports = {
  newPoint,
};
