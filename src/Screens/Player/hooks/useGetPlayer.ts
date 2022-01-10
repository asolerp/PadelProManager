import {players} from '../../../Mocks/players';

export const useGetPlayer = ({playerId}) => {
  const player = players.find(p => p.id === playerId);
  return {player};
};
