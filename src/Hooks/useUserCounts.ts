import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../Api/queries';
import {AuthContext} from '../Context/AuthContex';

export const useUserCounts = () => {
  const {user} = useContext(AuthContext);

  const [matches] = useCollectionData(
    matchQuery.where('coachId', '==', user?.id),
    {
      idField: 'id',
    },
  );

  return {
    matchesCount: matches?.length,
  };
};
