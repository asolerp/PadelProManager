import {useCollectionData} from 'react-firebase-hooks/firestore';
import {conversationsQuery} from '../Api/queries';

import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useGetNoReadMessages = () => {
  const {user} = useFirebaseAuth();

  const [conversations] = useCollectionData(
    conversationsQuery.where('active', '==', true),
    {
      idField: 'id',
    },
  );

  const noReadMessages = conversations?.some(
    c => c?.lastMessage?.readBy?.[user?.email] === false,
  );

  return {
    noReadMessages,
  };
};
