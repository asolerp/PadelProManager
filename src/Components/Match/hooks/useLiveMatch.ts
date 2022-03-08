import {tennisGameLogic} from '../../../Utils/gameLogic';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {useAddDocument} from '../../../Hooks/useAddDocument';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {ERROR_FORCED, NONFORCED, WINNER} from '../../../Utils/constants';
import {Alert} from 'react-native';
import {useRecursiveDelete} from '../../../Hooks/useRecursiveDelete';
import {useContext} from 'react';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {popScreen} from '../../../Router/utils/actions';
import {useDocumentData} from 'react-firebase-hooks/firestore';

export const useLiveMatch = matchId => {
  const query = firestore().collection('matches');
  const matchQuery = firestore().collection('matches').doc(matchId);
  const {updateDocument, loading: loadingUpdate} = useUpdateDocument(query);

  const [match] = useDocumentData(matchQuery, {
    idField: 'id',
  });

  console.log('MATCH', matchId, match);

  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);
  const {addDocument, loading: loadingAdd} = useAddDocument(
    matchQuery.collection('history'),
  );

  const {recursiveDelete} = useRecursiveDelete({
    path: `matches/${match?.id}`,
  });

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
      console.log('GAME', match?.game);
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
