export const mapPoints = {
  0: '0',
  1: '15',
  2: '30',
  3: '40',
  4: 'ADV',
  5: '0',
};

export const mapPointsToNumber = {
  0: 0,
  15: 1,
  30: 2,
  40: 3,
  ADV: 4,
  5: 0,
};

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
    set: game?.set + 1,
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

const checkSetState = (game, firstTeamToCheck, seconTeamToCheck) => {
  const mainTeam = firstTeamToCheck[1];
  const sets = game[`s${game?.set}${firstTeamToCheck}`] + 1;
  if (sets >= 6) {
    if (game[`s${game?.set}${firstTeamToCheck}`] === 7) {
      // firstTeamToCheck wins tiebreak
      return generateSet(game, game?.set, mainTeam);
    }
    if (game[`s${game?.set}${seconTeamToCheck}`] === 6) {
      // We are in tiebreak
      return {
        ...game,
        team1: 0,
        team2: 0,
        team1Tiebreak: 0,
        team2Tiebreak: 0,
        [`s${game?.set}${firstTeamToCheck}`]: sets,
        tiebreak: true,
      };
    }
    if (sets - game[`s${game?.set}${seconTeamToCheck}`] >= 2) {
      // firstTeamToCheck wins set
      return generateSet(game, game?.set, mainTeam);
    }
  }
  return {
    ...game,
    team1: 0,
    team2: 0,
    service:
      game?.service === firstTeamToCheck ? seconTeamToCheck : firstTeamToCheck,
    [`s${game?.set}${firstTeamToCheck}`]:
      game[`s${game?.set}${firstTeamToCheck}`] + 1,
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
  if (service === 't1') {
    if (points % 2 !== 0) {
      return 't2';
    }
    return 't1';
  }
  if (points % 2 !== 0) {
    return 't1';
  }
  return 't2';
};

const checkResult = game => {
  switch (game?.team1 - game?.team2) {
    case 1:
      return {
        ...game,
        ['team1']: 4,
      };
    case -1:
      return {
        ...game,
        ['team2']: 4,
      };
    default:
      if (game?.team1 > game?.team2) {
        return checkSetState(game, 't1', 't2');
      }
      return checkSetState(game, 't2', 't1');
  }
};

export const resultGame = game => {
  if (game?.tiebreak) {
    return `${game?.team1Tiebreak}-${game?.team2Tiebreak}`;
  } else {
    if (game?.team1 === 0 && game?.team2 === 0) {
      return '0-0';
    }
    if (game?.team1 >= 4 || game?.team2 >= 4) {
      if (game?.team1 === game?.team2) {
        return '40-40';
      }
      switch (game?.team1 - game?.team2) {
        case 1:
          return 'ADV-40';
        case -1:
          return '40-ADV';
        default:
          break;
      }
    }
  }

  return `${mapPoints[game?.team1]}-${mapPoints[game?.team2]}`;
};

export const tennisGameLogic = (game, winPointTeam) => {
  console.log(winPointTeam);

  const teamWinPoint = winPointTeam;
  const teamLosePoint = winPointTeam === 'team1' ? 'team2' : 'team1';

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
      [`${teamWinPoint}`]: game?.[`${teamWinPoint}`] + 1,
    };

    if (newGameState.team1 >= 4 || newGameState.team2 >= 4) {
      if (newGameState.team1 !== newGameState.team2) {
        return checkResult(newGameState);
      }
      return {
        ...game,
        team1: 3,
        team2: 3,
      };
    } else {
      return {...game, [`${teamWinPoint}`]: game?.[`${teamWinPoint}`] + 1};
    }
  }
};
