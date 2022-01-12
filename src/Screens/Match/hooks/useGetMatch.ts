import {matches} from '../../../Mocks/matches';

export const useGetMatch = (matchId: string) => {
  const match = matches.find(m => m.id === matchId);
  return {
    match,
  };
};
