import {useState} from 'react';
import functions from '@react-native-firebase/functions';
import {popScreen} from '../../../Router/utils/actions';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {matchQuery} from '../../../Api/queries';
import {timeout} from '../../../Utils/timeout';

export const useSavePlayersStats = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState();

  const savePlayersStats = functions().httpsCallable('savePlayersStats');
  const {updateDocument} = useUpdateDocument(matchQuery);

  const savePlayersStatsHandler = async ({match}) => {
    setLoading(true);
    try {
      await timeout(2000);
      await updateDocument(match?.id, {state: 'finished'});
      await savePlayersStats({
        playersStats: match?.statistics?.total,
        date: match?.date,
        matchId: match?.id,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    error,
    loading,
    savePlayersStatsHandler,
  };
};
