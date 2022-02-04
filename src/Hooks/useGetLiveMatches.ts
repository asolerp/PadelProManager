import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {AuthContext} from '../Context/AuthContex';

export const useGetLiveMatches = () => {
  const {user} = useContext(AuthContext);

  const query = firestore()
    .collection('matches')
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
