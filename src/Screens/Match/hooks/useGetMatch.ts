import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore';

export const useGetMatch = (matchId: string) => {
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

  const loading = loadingMatch || loadingHistory || loadingNotes;
  const error = errorMatch || errorHistory || errorNotes;
  const isMatchFinished = match?.state === 'finished';
  const isGameFinished = match?.game?.finished;

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
