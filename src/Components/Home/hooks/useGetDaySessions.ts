import {useContext, useMemo} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {sessionQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';

export const useGetDaySessions = () => {
  const {user} = useContext(AuthContext);
  const query = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start.getTime());
    end.setHours(23, 59, 59, 999);

    return sessionQuery(user?.id)
      .where('startTime', '>=', start)
      .where('startTime', '<=', end);
  }, [user?.id]);
  const [sessions, loading] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    sessions,
    loading,
  };
};
