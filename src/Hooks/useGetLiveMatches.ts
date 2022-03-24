import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../Api/queries';
import {AuthContext} from '../Context/AuthContex';

export const useGetLiveMatches = () => {
  const {user} = useContext(AuthContext);

  const query = matchQuery
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
