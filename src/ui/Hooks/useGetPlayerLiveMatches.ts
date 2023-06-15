import firestore from '@react-native-firebase/firestore';
import {useMemo} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useGetPlayerLiveMatches = userEmail => {
  const {user} = useFirebaseAuth();

  const query = useMemo(
    () =>
      user?.coachId &&
      firestore()
        .collection('matches')
        .where('coachId', '==', user?.coachId)
        .where('playersEmail', 'array-contains', userEmail)
        .where('state', '==', 'live'),
    [userEmail, user?.coachId],
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
