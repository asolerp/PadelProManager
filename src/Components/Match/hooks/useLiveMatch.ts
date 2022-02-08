import {tennisGameLogic} from '../../../Utils/gameLogic';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {useDeleteDocument} from '../../../Hooks/useDeleteDocument';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {ERROR_FORCED, NONFORCED, WINNER} from '../utils/constants';
import {Alert} from 'react-native';
import useRecursiveDelete from '../../../Hooks/useRecursiveDelete';
import {useContext} from 'react';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {popScreen} from '../../../Router/utils/actions';

export const useLiveMatch = match => {
  const query = firestore().collection('matches');
  const {updateDocument, loading: loadingUpdate} = useUpdateDocument(query);
  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);
  const {addDocument, loading: loadingAdd} = useAddDocument(
    query.doc(match?.id).collection('history'),
  );

  const {recursiveDelete} = useRecursiveDelete({
    path: `matches/${match?.id}`,
    callback: () => {
      setIsVisibleLoading(false);
    },
  });

  const handleWhoStarts = async team => {
    await updateDocument(match?.id, {
      'game.service': team,
    });
  };

  const handleDeleteMatch = async () => {
    setText('Eliminando partida...');
    setIsVisibleLoading(true);
    try {
      recursiveDelete();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePoint = async (stats, callback) => {
    let error = false;
    stats?.points?.forEach(st => {
      if (st?.result === NONFORCED) {
        if (st?.player?.team === stats?.winPointTeam) {
          error = true;
        }
      }
      if (st?.result === WINNER || st?.result === ERROR_FORCED) {
        if (st?.player?.team !== stats?.winPointTeam) {
          error = true;
        }
      }
    });
    if (!error) {
      const newStateGame = tennisGameLogic(match?.game, stats?.winPointTeam);
      try {
        await addDocument({
          data: {
            ...stats,
            points: [...stats.points, {info: newStateGame?.info?.text || null}],
            date: new Date(),
            gameState: newStateGame,
          },
        });
        if (newStateGame?.winMatch) {
          await addDocument({
            data: {
              date: new Date(),
              alert: `Partido finalizado, Gana el equipo ${newStateGame?.winMatch}`,
              type: 'info',
            },
          });
        }
        delete newStateGame.info;
        await updateDocument(match?.id, {
          game: newStateGame,
          state: newStateGame.finished ? 'finished' : 'live',
          [`statistics.s${newStateGame.set}.count`]:
            firebase.firestore.FieldValue.increment(1),
          ['statistics.total.count']:
            firebase.firestore.FieldValue.increment(1),
        });
        await Promise.all(
          stats?.points
            .filter(p => p?.player?.id)
            .map(
              async p =>
                await updateDocument(match?.id, {
                  [`statistics.s${newStateGame.set}.${p?.team}.players.${p?.player?.id}.${p?.result}.${p?.point}`]:
                    firebase.firestore.FieldValue.increment(1),
                  [`statistics.s${newStateGame.set}.${p?.team}.global.${p?.result}.${p?.point}`]:
                    firebase.firestore.FieldValue.increment(1),
                  [`statistics.s${newStateGame.set}.${p?.team}.global.${p?.result}.count`]:
                    firebase.firestore.FieldValue.increment(1),
                  [`statistics.total.${p?.team}.players.${p?.player?.id}.${p?.result}.${p?.point}`]:
                    firebase.firestore.FieldValue.increment(1),
                  [`statistics.total.${p?.team}.global.${p?.result}.${p?.point}`]:
                    firebase.firestore.FieldValue.increment(1),
                  [`statistics.total.${p?.team}.global.${p?.result}.count`]:
                    firebase.firestore.FieldValue.increment(1),
                }),
            ),
        );
      } catch (err) {
        console.log(err);
      } finally {
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
