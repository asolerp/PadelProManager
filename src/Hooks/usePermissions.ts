import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../Api/queries';
import {AuthContext} from '../Context/AuthContex';
import {SubscriptionContext} from '../Context/SubscriptionContext';

export const usePermissions = () => {
  const {user} = useContext(AuthContext);
  const {isSubscribed} = useContext(SubscriptionContext);

  const [players] = useCollectionData(
    playerQuery(user?.id).where('coach', 'array-contains', user?.id),
  );

  const playersOfUser = players?.length;
  const isCoach = user?.role === 'coach';
  const getIsOwner = matchOwnerId => {
    return matchOwnerId === user?.id;
  };
  const permissionCreateNewPlayer = playersOfUser === 0 || isSubscribed;

  return {
    isCoach,
    getIsOwner,
    permissionCreateNewPlayer,
  };
};
