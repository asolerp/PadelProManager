import {players} from '../../../Mocks/players';

export const useGetPlayer = (playerId: string) => {
  const player = players.find(p => p.id === playerId);

  const globalStats = player.stats.global;
  const winners = player.stats.play.winners;
  const nonforced = player.stats.play.nonforced;

  return {player, globalStats, winners, nonforced};
};
