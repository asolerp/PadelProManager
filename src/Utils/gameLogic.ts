const mapPoints = {
  0: '0',
  1: '15',
  2: '30',
  3: '40',
  4: 'ADV',
};

export const tennisGameLogic = (game, point) => {
  const teamWinPoint = point[0]?.team;
  const newGameState = {
    ...game,
    [`${teamWinPoint}`]: game?.[`${teamWinPoint}`] + 1,
  };

  if (newGameState.pt1 >= 4 || newGameState.pt2 >= 4) {
    if (newGameState.pt1 !== newGameState.pt2) {
      return checkResult(newGameState);
    }
  } else {
    return {...game, [`${teamWinPoint}`]: game?.[`${teamWinPoint}`] + 1};
  }
};

const checkResult = game => {
  switch (game.pt1 - game.pt2) {
    case 1:
      return 'Adv Player1';
    case -1:
      return 'Adv Player2';
    default:
      if (game.pt1 > game.pt2) {
        const sets = game[`s${game.set}t1`] + 1;
        if (sets >= 6) {
          if (sets - game[`s${game.set}t2`] >= 2) {
            return {
              ...game,
              pt1: 0,
              pt2: 0,
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
          pt1: 0,
          pt2: 0,
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
        pt1: 0,
        pt2: 0,
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
  if (game.pt1 === 0 && game.pt2 === 0) {
    return '0-0';
  }

  if (game.pt1 >= 4 || game.pt2 >= 4) {
    if (game.pt1 === game.pt2) {
      return '40-40';
    }
    return game.ctheckResult();
  }

  return `${mapPoints[game.pt1]}-${mapPoints[game.pt2]}`;
};
