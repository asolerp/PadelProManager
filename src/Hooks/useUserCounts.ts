import {useCollectionData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../Api/queries';
import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useUserCounts = () => {
  const {user} = useFirebaseAuth();

  const [matches] = useCollectionData(
    matchQuery.where('coachId', '==', user?.id),
    {
      idField: 'id',
    },
  );

  return {
    matchesCount: matches?.length,
  };
};
