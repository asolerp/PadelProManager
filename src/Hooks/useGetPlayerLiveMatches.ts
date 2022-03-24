import firestore from '@react-native-firebase/firestore';
import {useMemo} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export const useGetPlayerLiveMatches = userEmail => {
  const query = useMemo(
    () =>
      firestore()
        .collection('matches')
        .where('playersEmail', 'array-contains', userEmail)
        .where('state', '==', 'live'),
    [userEmail],
  );
  const [liveMatches, loadingLiveMatches, error] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    liveMatches,
    loadingLiveMatches,
    errorLiveMatches: error,
  };
};
