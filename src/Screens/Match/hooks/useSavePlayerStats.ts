import {useState} from 'react';
import functions from '@react-native-firebase/functions';
import {popScreen} from '../../../Router/utils/actions';

export const useSavePlayersStats = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState();

  const savePlayersStats = functions().httpsCallable('savePlayersStats');

  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const savePlayersStatsHandler = async ({match}) => {
    setLoading(true);
    try {
      await timeout(2000);
      await savePlayersStats({
        playersStats: match?.statistics?.total,
        date: match?.date,
        matchId: match?.id,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      popScreen();
    }
  };
  return {
    error,
    loading,
    savePlayersStatsHandler,
  };
};
