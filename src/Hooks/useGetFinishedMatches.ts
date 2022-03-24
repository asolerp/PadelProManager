import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../Api/queries';
import {AuthContext} from '../Context/AuthContex';

export const useGetFinishedMatches = () => {
  const {user} = useContext(AuthContext);

  const query =
    user &&
    matchQuery
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
