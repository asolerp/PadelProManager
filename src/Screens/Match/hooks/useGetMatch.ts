import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

export const useGetMatch = (matchId: string) => {
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const query = firestore().collection('matches').doc(matchId);

  const [match, loadingMatch, errorMatch] = useDocumentData(query, {
    idField: 'id',
  });

  const [history, loadingHistory, errorHistory] = useCollectionData(
    query.collection('history'),
    {
      idField: 'id',
    },
  );

  const [notes, loadingNotes, errorNotes] = useCollectionData(
    query.collection('notes'),
    {
      idField: 'id',
    },
  );

  useEffect(() => {
    if (match?.game?.finished) {
      setTimeout(() => {
        setIsFinished(true);
      }, 1000);
    }
  }, [match?.game?.finished]);

  const loading = loadingMatch || loadingHistory || loadingNotes;
  const error = errorMatch || errorHistory || errorNotes;
  const isMatchFinished = match?.state === 'finished';
  const isGameFinished = isFinished;

  return {
    notes,
    match,
    history,
    isGameFinished,
    isMatchFinished,
    errorMatch: error,
    loadingMatch: loading,
  };
};
