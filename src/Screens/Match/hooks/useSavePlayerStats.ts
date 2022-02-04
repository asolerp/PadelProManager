import {useContext, useState} from 'react';
import functions from '@react-native-firebase/functions';
import {popScreen} from '../../../Router/utils/actions';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {matchQuery} from '../../../Api/queries';
import {timeout} from '../../../Utils/timeout';
import {LoadingModalContext} from '../../../Context/LoadngModalContext';
import {useAddDocument} from '../../../Hooks/useAddDocument';

export const useSavePlayersStats = match => {
  const [error, setError] = useState();
  const {setIsVisible, setText} = useContext(LoadingModalContext);

  const savePlayersStats = functions().httpsCallable('savePlayersStats');
  const {updateDocument} = useUpdateDocument(matchQuery);
  const {addDocument} = useAddDocument(
    matchQuery.doc(match?.id).collection('history'),
  );

  const savePlayersStatsHandler = async () => {
    setText('Guardando stats de jugadores...');
    try {
      await timeout(1000);
      setIsVisible(true);
      await updateDocument(match?.id, {state: 'finished'});
      await savePlayersStats({
        playersStats: match?.statistics?.total,
        date: match?.date,
        matchId: match?.id,
      });
      await addDocument({
        data: {
          date: new Date(),
          alert: '🏆 Partido terminado 🏆',
          type: 'info',
        },
      });
    } catch (err) {
      setError(err);
    } finally {
      setText(null);
      setIsVisible(false);
    }
  };
  return {
    error,
    savePlayersStatsHandler,
  };
};
