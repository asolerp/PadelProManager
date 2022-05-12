import {useContext, useState} from 'react';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {matchQuery} from '../../../Api/queries';
import {timeout} from '../../../Utils/timeout';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useSavePlayersStats = match => {
  const [error, setError] = useState();
  const {setIsVisible, setText} = useContext(LoadingModalContext);

  const savePlayersStats = defaultFunctions.httpsCallable('savePlayersStats');
  const {updateDocument} = useUpdateDocument(matchQuery);
  const {addDocument} = useAddDocument(
    matchQuery.doc(match?.id).collection('history'),
  );

  const winTeam = match?.game?.winMatch;
  const loseTeam = match?.game?.winMatch === 1 ? 2 : 1;

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
      await Promise.all(
        match?.[`t${winTeam}`]
          .filter(p => p !== null)
          .map(
            async player =>
              await firestore()
                .collection('players')
                .doc(player?.id)
                .collection('stats')
                .doc('global')
                .update({
                  tw: firebase.firestore.FieldValue.increment(1),
                  tm: firebase.firestore.FieldValue.increment(1),
                }),
          ),
      );
      await Promise.all(
        match?.[`t${loseTeam}`]
          .filter(p => p !== null)
          .map(
            async player =>
              await firestore()
                .collection('players')
                .doc(player?.id)
                .collection('stats')
                .doc('global')
                .update({
                  tl: firebase.firestore.FieldValue.increment(1),
                  tm: firebase.firestore.FieldValue.increment(1),
                }),
          ),
      );
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
