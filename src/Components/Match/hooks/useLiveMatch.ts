import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {useState} from 'react';

import {ERROR_FORCED, NONFORCED, WINNER} from '../../../Utils/constants';
import {Alert} from 'react-native';
import {useRecursiveDelete} from '../../../Hooks/useRecursiveDelete';
import {useContext} from 'react';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {popScreen} from '../../../Router/utils/actions';
import {matchQuery} from '../../../Api/queries';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useLiveMatch = match => {
  const query = matchQuery;
  const {updateDocument, loading: loadingUpdate} = useUpdateDocument(query);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);

  const {recursiveDelete} = useRecursiveDelete({
    path: `matches/${match?.id}`,
  });

  const newPointFn = defaultFunctions.httpsCallable('newPoint');

  const handleWhoStarts = async (team, callback) => {
    try {
      await updateDocument(match?.id, {
        'game.service': team,
      });
    } catch (err) {
      console.log(err);
    } finally {
      callback && callback();
    }
  };

  const handleDeleteMatch = async (callback?: () => void) => {
    setText('Eliminando partida...');
    try {
      setIsVisibleLoading(true);
      await recursiveDelete(callback);
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisibleLoading(false);
      popScreen();
    }
  };

  const handleSavePoint = async (stats, callback) => {
    console.log('STATS', stats);
    let error = false;
    stats?.points?.forEach(st => {
      console.log(st.player);
      if (st?.result === NONFORCED) {
        if (st?.team === stats?.winPointTeam) {
          error = true;
        }
      }
      if (st?.result === WINNER || st?.result === ERROR_FORCED) {
        if (st?.team !== stats?.winPointTeam) {
          error = true;
        }
      }
    });
    if (!error) {
      try {
        setLoadingAdd(true);
        await newPointFn({
          match,
          stats,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAdd(false);
        callback && callback();
      }
    } else {
      Alert.alert('Error', 'Punto incorrecto, revisa los datos introducidos');
    }
  };

  const loading = loadingUpdate || loadingAdd;

  return {
    loading,
    handleWhoStarts,
    handleSavePoint,
    handleDeleteMatch,
  };
};
