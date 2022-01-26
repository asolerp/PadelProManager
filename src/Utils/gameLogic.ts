const mapPoints = {
  0: '0',
  1: '15',
  2: '30',
  3: '40',
  4: 'ADV',
};

export const tennisGameLogic = (game, winPointTeam) => {
  const teamWinPoint = winPointTeam;

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
};

const checkResult = game => {
  switch (game.team1 - game.team2) {
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
      if (game.team1 > game.team2) {
        const sets = game[`s${game.set}t1`] + 1;
        if (sets >= 6) {
          if (sets - game[`s${game.set}t2`] >= 2) {
            return {
              ...game,
              team1: 0,
              team2: 0,
              set: game.set + 1,
              s1t1: sets,
              info: {
                text: 'Pareja 1 gana el set! 🎾',
              },
            };
          }
        }
        return {
          ...game,
          team1: 0,
          team2: 0,
          service: game.service === 't1' ? 't2' : 't1',
          [`s${game.set}t1`]: game[`s${game.set}t1`] + 1,
          info: {
            text:
              game.service === 't1'
                ? '🔥 Pareja 1 gana el juego! 🔥'
                : 'Break para la pareja 1 💪🚀 !! ',
          },
        };
      }
      return {
        ...game,
        team1: 0,
        team2: 0,
        service: game.service === 't1' ? 't2' : 't1',
        [`s${game.set}t2`]: game[`s${game.set}t2`] + 1,
        info: {
          text:
            game.service === 't2'
              ? '🔥 Pareja 2 gana el juego! 🔥'
              : 'Break para la pareja 2 💪🚀 !! ',
        },
      };
  }
};

export const resultGame = game => {
  if (game.team1 === 0 && game.team2 === 0) {
    return '0-0';
  }

  if (game.team1 >= 4 || game.team2 >= 4) {
    if (game.team1 === game.team2) {
      return '40-40';
    }
    switch (game.team1 - game.team2) {
      case 1:
        return 'ADV-40';
      case -1:
        return '40-ADV';
      default:
        break;
    }
  }

  return `${mapPoints[game.team1]}-${mapPoints[game.team2]}`;
};
