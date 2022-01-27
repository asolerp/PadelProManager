import firestore from '@react-native-firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export const useGetMatches = playerId => {
  const query = playerId
    ? firestore()
        .collection('matches')
        .where('playersId', 'array-contains', playerId)
    : firestore().collection('matches');
  const [matches, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    matches,
    loadingMatches: loading,
    errorMatches: error,
  };
};
