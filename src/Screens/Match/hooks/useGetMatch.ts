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
  );

  const loading = loadingMatch || loadingHistory;
  const error = errorMatch || errorHistory;

  return {
    match,
    history,
    loadingMatch: loading,
    errorMatch: error,
  };
};
