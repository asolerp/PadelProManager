const generateSet = (game, sets, team) => {
  const isTiebreak = game?.tiebreak;
  const teamSetGame = game?.[`winsSetTeam${team}`] + 1;

  return {
    ...game,
    team1: 0,
    team2: 0,
    team1Tiebreak: 0,
    team2Tiebreak: 0,
    tiebreak: false,
    service: game.isTiebreak ? game.startServiceTiebreak === "t1" ? "t2" : "t1" : game.service === "t1" ? "t2" : "t1",
    set: game?.set < 3 ? game?.set + 1 : 3,
    [`winsSetTeam${team}`]: teamSetGame,
    [`s${sets}t${team}`]: Number(game?.[`s${sets}t${team}`]) + 1,
    finished: getIsMatchFinished(teamSetGame),
    winMatch: getIsMatchFinished(teamSetGame) && team,
    info: {
      text: isTiebreak
        ? `Pareja ${team} gana el tiebreak ${game?.team1Tiebreak}-${game?.team2Tiebreak}!`
        : `Pareja ${team} gana el set! 🎾`,
    },
  };
};

const getIsMatchFinished = teamSet => teamSet === 2;

const checkSetState = (game, firstTeamToCheck, secondTeamToCheck) => {
  const mainTeam = firstTeamToCheck[1];
  const sets = game[`s${game?.set}${firstTeamToCheck}`] + 1;
  if (sets >= 6) {
    if (game[`s${game?.set}${firstTeamToCheck}`] === 7) {
      // firstTeamToCheck wins tiebreak
      return generateSet(game, game?.set, mainTeam);
    }
    if (game[`s${game?.set}${secondTeamToCheck}`] === 6) {
      // We are in tiebreak
      return {
        ...game,
        team1: 0,
        team2: 0,
        service: game.service === "t1" ? "t2" : "t1",
        team1Tiebreak: 0,
        team2Tiebreak: 0,
        [`s${game?.set}${firstTeamToCheck}`]: sets,
        startServiceTiebreak: game.service === "t1" ? "t2" : "t1",
        tiebreak: true,
      };
    }
    if (sets - game[`s${game?.set}${secondTeamToCheck}`] >= 2) {
      // firstTeamToCheck wins set
      return generateSet(game, game?.set, mainTeam);
    }
  }

  return {
    ...game,
    team1: 0,
    team2: 0,
    service:
      game?.service === firstTeamToCheck ? secondTeamToCheck : firstTeamToCheck,
    [`s${game?.set}${firstTeamToCheck}`]:
      game[`s${game?.set}${firstTeamToCheck}`] + 1,
    breakpoint:
      game?.service !== firstTeamToCheck && `team${firstTeamToCheck[1]}`,
    info: {
      text:
        game?.service === firstTeamToCheck
          ? `🔥 Pareja ${firstTeamToCheck[1]} gana el juego! 🔥`
          : `Break para la pareja ${firstTeamToCheck[1]} 💪🚀 !!`,
    },
  };
};

const checkResultTiebreak = game => {
  switch (game?.team1Tiebreak - game?.team2Tiebreak) {
    case 1:
      return;
    case -1:
      return;
    default:
      if (game?.team1Tiebreak > game?.team2Tiebreak) {
        return generateSet(game, game?.set, 1);
      }
      return generateSet(game, game?.set, 2);
  }
};

const checkWhoServesTB = (service, points) => {
  if (service === "t1") {
    if (points % 2 !== 0) {
      return "t2";
    }
    return "t1";
  }
  if (points % 2 !== 0) {
    return "t1";
  }
  return "t2";
};

const checkResult = game => {
  if (game?.goldPoint) {
    if (game?.team1 > 3 || game?.team2 > 3) {
      if (game?.team1 > game?.team2) {
        return checkSetState(game, "t1", "t2");
      } else {
        return checkSetState(game, "t2", "t1");
      }
    } else {
      return game;
    }
  } else {
    if (game?.team1 > 3 || game?.team2 > 3) {
      if (game?.team1 > game?.team2) {
        if (game?.team1 - game?.team2 > 1) {
          return checkSetState(game, "t1", "t2");
        }
        return game;
      } else {
        if (game?.team2 - game?.team1 > 1) {
          return checkSetState(game, "t2", "t1");
        }
        return game;
      }
    } else {
      return game;
    }
  }
};

const tennisGameLogic = (game, winPointTeam) => {
  const teamWinPoint = winPointTeam;
  const teamLosePoint = winPointTeam === "team1" ? "team2" : "team1";

  if (game?.tiebreak) {
    const newGameState = {
      ...game,
      [`${teamWinPoint}Tiebreak`]: game?.[`${teamWinPoint}Tiebreak`] + 1,
    };
    if (newGameState.team1Tiebreak >= 7 || newGameState.team2Tiebreak >= 7) {
      return checkResultTiebreak(newGameState);
    }
    return {
      ...game,
      service: checkWhoServesTB(
        game?.service,
        game?.[`${teamWinPoint}Tiebreak`] +
          1 +
          game?.[`${teamLosePoint}Tiebreak`],
      ),
      [`${teamWinPoint}Tiebreak`]: game?.[`${teamWinPoint}Tiebreak`] + 1,
    };
  } else {
    const newGameState = {
      ...game,
      consecutiveWon:
        game?.lastPointWon === teamWinPoint
          ? game?.consecutiveWon + 1
          : 1,
      lastPointWon: teamWinPoint,
      [`${teamWinPoint}`]: game?.[`${teamWinPoint}`] + 1,
    };

    if (newGameState.team1 >= 3 || newGameState.team2 >= 3) {
      return checkResult(newGameState);
    } else {
      return newGameState;
    }
  }
};

module.exports = {
  tennisGameLogic,
};
