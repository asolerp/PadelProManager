import {format} from 'date-fns';

import {useCollectionDataOnce} from 'react-firebase-hooks/firestore';
import {sessionQuery} from '../../../Api/queries';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';

export const useGetDaySessions = () => {
  const {user, isCoach} = useFirebaseAuth();

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const parsedStart = Number(format(start, 'T'));

  const end = new Date(start.getTime());
  end.setHours(23, 59, 59, 999);
  const parsedEnd = Number(format(end, 'T'));

  const query = isCoach
    ? sessionQuery
        .where('coachId', '==', user?.id)
        .where('date', '>=', parsedStart)
        .where('date', '<=', parsedEnd)
    : sessionQuery
        .where('playersEmail', 'array-contains', user?.email)
        .where('date', '>=', parsedStart)
        .where('date', '<=', parsedEnd);

  const [sessions, loading] = useCollectionDataOnce(query, {
    idField: 'id',
  });

  return {
    sessions,
    loading,
  };
};
