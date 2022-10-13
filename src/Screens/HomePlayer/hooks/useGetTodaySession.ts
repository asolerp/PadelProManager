import {useCollectionData} from 'react-firebase-hooks/firestore';
import {SESSIONS} from '../../../Models/entities';
import firestore from '@react-native-firebase/firestore';
import {format} from 'date-fns';
import {useContext} from 'react';
import {AuthContext} from '../../../Context/AuthContex';

export const useGetTodaySession = () => {
  const {user} = useContext(AuthContext);

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const parsedStart = Number(format(start, 'T'));

  const end = new Date(start.getTime());
  end.setHours(23, 59, 59, 999);
  const parsedEnd = Number(format(end, 'T'));

  const sessionQuery = firestore()
    .collection(SESSIONS)
    .where('playersEmail', 'array-contains', user?.email)
    .where('date', '>=', parsedStart)
    .where('date', '<=', parsedEnd);

  const [sessions] = useCollectionData(sessionQuery, {
    idField: 'id',
  });

  return {
    sessions,
  };
};
