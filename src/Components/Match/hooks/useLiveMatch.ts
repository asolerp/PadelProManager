import {tennisGameLogic} from '../../../Utils/gameLogic';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {useAddDocument} from '../../../Hooks/useAddDocument';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export const useLiveMatch = match => {
  const query = firestore().collection('matches');
  const {updateDocument, loading: loadingUpdate} = useUpdateDocument(query);
  const {addDocument, loading: loadingAdd} = useAddDocument(
    query.doc(match?.id).collection('history'),
  );

  const handleWhoStarts = async team => {
    await updateDocument(match?.id, {
      'game.service': team,
    });
  };

  const handleSavePoint = async (stats, callback) => {
    const newStateGame = tennisGameLogic(match?.game, stats.points);

    try {
      await addDocument({
        data: {
          ...stats,
          points: [...stats.points, {info: newStateGame?.info?.text || null}],
          date: new Date(),
          gameState: newStateGame,
        },
      });

      delete newStateGame.info;

      await updateDocument(match?.id, {
        game: newStateGame,
        ['statistics.total.count']: firebase.firestore.FieldValue.increment(1),
      });

      await Promise.all(
        stats?.points
          .filter(p => p?.player?.id)
          .map(
            async p =>
              await updateDocument(match?.id, {
                [`statistics.s${newStateGame.set}.${p?.team}.${p?.player?.id}.${p?.result}.${p?.point}`]:
                  firebase.firestore.FieldValue.increment(1),
                [`statistics.total.${p?.team}.${p?.result}.${p?.point}`]:
                  firebase.firestore.FieldValue.increment(1),
                [`statistics.total.${p?.team}.${p?.result}.count`]:
                  firebase.firestore.FieldValue.increment(1),
              }),
          ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      callback();
    }
  };

  const loading = loadingUpdate || loadingAdd;

  return {
    loading,
    handleWhoStarts,
    handleSavePoint,
  };
};
