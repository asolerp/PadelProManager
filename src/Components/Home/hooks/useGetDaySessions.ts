import {format} from 'date-fns';
import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {sessionQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';

export const useGetDaySessions = () => {
  const {user, isCoach} = useContext(AuthContext);

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

  const [sessions, loading] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    sessions,
    loading,
  };
};
