import {MAP_POINTS} from './constants';

export const resultGame = game => {
  if (game?.tiebreak) {
    return `${game?.team1Tiebreak}-${game?.team2Tiebreak}`;
  } else {
    if (game?.team1 === 0 && game?.team2 === 0) {
      return '0-0';
    }
  }

  return `${MAP_POINTS[game?.team1]}-${MAP_POINTS[game?.team2]}`;
};
