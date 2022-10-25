import {useDocumentData} from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore';
import {HISTORY, MATCHES} from '../../../Models/entities';
import {format} from 'date-fns';
import {useState} from 'react';

export const useRestorePoint = matchId => {
  const matchStateRef = firestore()
    .collection(MATCHES)
    .doc(matchId)
    .collection('lastState')
    .doc('lastState');

  const [loadingRestorePoint, setLoadingRestorePoint] = useState();

  const [lastState] = useDocumentData(matchStateRef, {
    idField: 'id',
  });

  const handleRestorePoint = async () => {
    setLoadingRestorePoint(true);
    try {
      const historyQuery = await firestore()
        .collection(MATCHES)
        .doc(matchId)
        .collection(HISTORY)
        .orderBy('date', 'desc')
        .limit(1)
        .get();

      const historyDoc = historyQuery.docs.map(d => ({id: d.id, ...d.data()}));

      await firestore()
        .collection(MATCHES)
        .doc(matchId)
        .collection(HISTORY)
        .doc(historyDoc[0].id)
        .delete();

      await firestore().collection(MATCHES).doc(matchId).update({
        game: lastState.game,
        statistics: lastState.statistics,
      });
      await firestore()
        .collection(MATCHES)
        .doc(matchId)
        .collection('lastState')
        .doc('lastState')
        .delete();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRestorePoint(false);
    }
  };

  console.log('[[STATES]]', lastState);

  return {handleRestorePoint, loadingRestorePoint, lastState};
};
