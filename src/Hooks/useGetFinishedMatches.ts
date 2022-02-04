import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {AuthContext} from '../Context/AuthContex';

export const useGetFinishedMatches = () => {
  const {user} = useContext(AuthContext);

  const query = firestore()
    .collection('matches')
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
