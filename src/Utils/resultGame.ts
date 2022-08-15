import {MAP_POINTS} from './constants';

export const resultGame = (game, goldPoint) => {
  console.log(game);
  if (game?.tiebreak) {
    return `${game?.team1Tiebreak}-${game?.team2Tiebreak}`;
  } else {
    if (game?.team1 === 0 && game?.team2 === 0) {
      return '0-0';
    }
    if (goldPoint) {
      return `${MAP_POINTS[game?.team1]}-${MAP_POINTS[game?.team2]}`;
    }

    if (game?.team1 >= 3 && game?.team2 >= 3) {
      if (game?.team1 === game?.team2) {
        return '40-40';
      }
      if (game?.team1 > game?.team2) {
        return 'ADV-40';
      }
      return '40-ADV';
    }

    return `${MAP_POINTS[game?.team1]}-${MAP_POINTS[game?.team2]}`;
  }
};
