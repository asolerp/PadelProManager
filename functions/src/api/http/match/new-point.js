const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {firestore} = require("firebase-admin");
const {tennisGameLogic} = require("../../../utils/gameLogic");
const {FB_REGION, MATCHES, HISTORY, LAST_STATE} = require("../../../utils/constants");

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
    
    const batch = admin.firestore().batch();
    const matchRef = admin.firestore().collection(MATCHES).doc(match?.id);

    await matchRef.collection(LAST_STATE).doc("lastState").set({
      game: match.game,
      statistics: match.statistics,
      createdAt: new Date()
    })

    const newStateGame = tennisGameLogic(match?.game, stats?.winPointTeam);
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



      if(match.game.service === "t1" && newStateGame?.team2 === 3 && newStateGame?.team1 < 3) {
       
        // statisticsToUpdate[`s${newStateGame.set}`].team1.global.breakpoints = match?.statistics[`s${newStateGame.set}`].team1.global.breakpoints + 1
        // statisticsToUpdate.total.team1.global.breakpoints = match?.statistics.total.team1.global.breakpoints + 1

       batch.update(matchRef,{
          [`statistics.s${newStateGame.set}.team2.global.breakpoints`]:
            firestore.FieldValue.increment(1),
          ["statistics.total.team2.global.breakpoints"]: firestore.FieldValue.increment(1),
        });
      }

      if(match.game.service === "t2" && newStateGame?.team1 === 3 && newStateGame?.team2 < 3) {
        
        // statisticsToUpdate[`s${newStateGame.set}`].team2.global.breakpoints = match?.statistics[`s${newStateGame.set}`].team2.global.breakpoints + 1
        // statisticsToUpdate.total.team2.global.breakpoints = match?.statistics?.total.team2.global.breakpoints + 1

        batch.update(matchRef,{
          [`statistics.s${newStateGame.set}.team1.global.breakpoints`]:
            firestore.FieldValue.increment(1),
          ["statistics.total.team1.global.breakpoints"]: firestore.FieldValue.increment(1),
        });
      }


      if(match.game.service === "t2" && match?.game?.team1 === 3) {
        if (stats?.winPointTeam === "team1") {
          batch.update(matchRef,{
            [`statistics.s${newStateGame.set}.team1.global.wonBreakpoints`]:
              firestore.FieldValue.increment(1),
            ["statistics.total.team1.global.wonBreakpoints"]: firestore.FieldValue.increment(1),
          });
        }
      }

      if(match.game.service === "t1" && match?.game?.team2 === 3) {
        if (stats?.winPointTeam === "team2") {
          batch.update(matchRef,{
            [`statistics.s${newStateGame.set}.team2.global.wonBreakpoints`]:
              firestore.FieldValue.increment(1),
            ["statistics.total.team2.global.wonBreakpoints"]: firestore.FieldValue.increment(1),
          });
        }
      }

 
      if (newStateGame?.team1 === 3 && newStateGame?.team2 === 3 &&
        match?.game?.goldPoint) {
         if (match.game.service === "t1") {
          batch.update(matchRef,{
            [`statistics.s${newStateGame.set}.team2.global.breakpoints`]:
              firestore.FieldValue.increment(1),
            ["statistics.total.team2.global.breakpoints"]: firestore.FieldValue.increment(1),
          });
         } else {
          batch.update(matchRef,{
            [`statistics.s${newStateGame.set}.team1.global.breakpoints`]:
              firestore.FieldValue.increment(1),
            ["statistics.total.team1.global.breakpoints"]: firestore.FieldValue.increment(1),
          });
         }
         batch.update(matchRef,{
          [`statistics.s${newStateGame.set}.goldPoints`]:
            firestore.FieldValue.increment(1),
          ["statistics.total.goldPoints"]: firestore.FieldValue.increment(1),
        });
      }

      if (
        match?.game?.team1 === 3 &&
        match?.game?.team2 === 3 &&
        match?.game?.goldPoint
      ) {
        if (stats?.winPointTeam === "team1") {
          batch.update(matchRef,{
            [`statistics.s${match?.game.set}.team1.global.wonGoldPoints`]:
              firestore.FieldValue.increment(1),
            ["statistics.total.team1.global.wonGoldPoints"]:
              firestore.FieldValue.increment(1),
          });
        } else {
          batch.update(matchRef,{
            [`statistics.s${match?.game.set}.team2.global.wonGoldPoints`]:
              firestore.FieldValue.increment(1),
            ["statistics.total.team2.global.wonGoldPoints"]:
              firestore.FieldValue.increment(1),
          });
        }
      }

      const p = stats?.points?.[0]

      
      if (!p.result) {
        if(stats?.winPointTeam === "team1") {
          batch.update(matchRef,{
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

        if(stats?.winPointTeam === "team2") {
          batch.update(matchRef,{
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
        batch.update(matchRef,{
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

      if (
        newStateGame?.consecutiveWon >
        (match?.statistics?.[match?.game.set]?.[stats?.winPointTeam]?.global?.consecutiveWon || 0)
      ) {

        console.log("actualizando set")

        batch.update(matchRef,{
          [`statistics.s${match?.game.set}.${stats?.winPointTeam}.global.consecutiveWon`]:
            newStateGame?.consecutiveWon,
        });
      }
      

      if (
        newStateGame?.consecutiveWon >
        (match?.statistics?.total?.[stats?.winPointTeam].global?.consecutiveWon || 0)
      ) {

        batch.update(matchRef,{
          [`statistics.total.${stats?.winPointTeam}.global.consecutiveWon`]:
            newStateGame?.consecutiveWon,
        });
      }

      batch.update(matchRef,{
        [`statistics.s${newStateGame.set}.count`]:
          firestore.FieldValue.increment(1),
        ["statistics.total.count"]: firestore.FieldValue.increment(1),
      });

      batch.update(matchRef,{
        game: newStateGame,
      });

      await batch.commit()

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
