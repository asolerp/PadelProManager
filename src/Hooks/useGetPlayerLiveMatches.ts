import firestore from '@react-native-firebase/firestore';
import {useMemo} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export const useGetPlayerLiveMatches = playerId => {
  const query = useMemo(
    () =>
      firestore()
        .collection('matches')
        .where('playersId', 'array-contains', playerId)
        .where('state', '==', 'live'),
    [playerId],
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
