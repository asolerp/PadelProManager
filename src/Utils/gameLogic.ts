const mapPoints = {
  0: '0',
  1: '15',
  2: '30',
  3: '40',
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
        return {
          ...game,
          pt1: 0,
          pt2: 0,
          s1t1: game.st1t1 + 1,
        };
      }
      return {
        ...game,
        pt1: 0,
        pt2: 0,
        s1t2: game.s1t1 + 1,
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
