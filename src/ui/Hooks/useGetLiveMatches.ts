import {useCollectionData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../Api/queries';

import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useGetLiveMatches = () => {
  const {user} = useFirebaseAuth();

  const query = matchQuery
    .where('coachId', '==', user?.id)
    .where('state', '==', 'live');
  const [liveMatches, loadingLiveMatches, error] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    liveMatches,
    loadingLiveMatches,
    errorLiveMatches: error,
  };
};
