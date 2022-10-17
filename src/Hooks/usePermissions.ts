import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../Api/queries';
import {useFirebaseAuth} from '../Context/FirebaseContext';

import {SubscriptionContext} from '../Context/SubscriptionContext';
import {Roles} from '../Global/types';

export const usePermissions = () => {
  const {user} = useFirebaseAuth();

  const {isSubscribed} = useContext(SubscriptionContext);

  const [players] = useCollectionData(
    playerQuery(user?.id).where(Roles.COACH, 'array-contains', user?.id),
  );

  const playersOfUser = players?.length;
  const isCoach = user?.role === Roles.COACH;
  const isAdmin = user?.role === Roles.ADMIN;
  const getIsOwner = matchOwnerId => {
    return matchOwnerId === user?.id;
  };
  const permissionCreateNewPlayer = playersOfUser === 0 || isSubscribed;

  return {
    isAdmin,
    isCoach,
    getIsOwner,
    permissionCreateNewPlayer,
  };
};
