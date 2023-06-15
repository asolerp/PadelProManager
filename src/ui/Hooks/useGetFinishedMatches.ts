import {useCollectionData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../Api/queries';

import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useGetFinishedMatches = () => {
  const {user} = useFirebaseAuth();

  const query =
    user &&
    matchQuery
      .where('coachId', '==', user?.id)
      .where('state', '==', 'finished')
      .orderBy('date', 'desc')
      .limit(5);
  const [finishedMatches, loadingFinishedMatches, error] = useCollectionData(
    query,
    {
      idField: 'id',
    },
  );

  return {
    finishedMatches,
    loadingFinishedMatches,
    errorLiveMatches: error,
  };
};
