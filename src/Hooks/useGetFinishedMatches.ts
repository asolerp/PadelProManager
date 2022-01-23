import firestore from '@react-native-firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export const useGetFinishedMatches = () => {
  const query = firestore()
    .collection('matches')
    .where('state', '==', 'finished');
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
