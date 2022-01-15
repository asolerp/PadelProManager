import firestore from '@react-native-firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export const useGetMatches = () => {
  const query = firestore().collection('matches');
  const [matches, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    matches,
    loadingMatches: loading,
    errorMatches: error,
  };
};
