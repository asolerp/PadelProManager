import firestore from '@react-native-firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {OPEN_SESSION} from '../../../Models/entities';

export const useOpenSessions = () => {
  const openSessionsQuery = firestore().collection(OPEN_SESSION);

  const [openSessions, loading] = useCollectionData(openSessionsQuery, {
    idField: 'id',
  });

  return {openSessions, loading};
};
