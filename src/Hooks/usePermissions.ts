import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../Api/queries';
import {AuthContext} from '../Context/AuthContex';
import {SubscriptionContext} from '../Context/SubscriptionContext';

export const usePermissions = () => {
  const {user} = useContext(AuthContext);
  const {isUserWithActiveSubscription} = useContext(SubscriptionContext);

  const [players] = useCollectionData(
    playerQuery.where('coach', 'array-contains', user?.id),
  );

  const playersOfUser = players?.length;

  const permissionCreateNewPlayer =
    playersOfUser === 0 || isUserWithActiveSubscription;

  console.log(permissionCreateNewPlayer);

  return {
    permissionCreateNewPlayer,
  };
};
