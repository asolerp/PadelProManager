import firestore from '@react-native-firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {MATCHES} from '../../../Models/entities';

export const useGetProMatches = () => {
  const proMatchQuery = firestore()
    .collection(MATCHES)
    .where('category', '==', -1)
    .where('state', '==', 'finished')
    .orderBy('date')
    .limit(5);

  const [proMatches, loading] = useCollectionData(proMatchQuery, {
    idField: 'id',
  });

  return {
    proMatches,
    loading,
  };
};
