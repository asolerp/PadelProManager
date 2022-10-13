import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {conversationsQuery} from '../Api/queries';
import {AuthContext} from '../Context/AuthContex';

export const useGetNoReadMessages = () => {
  const {user} = useContext(AuthContext);
  const [conversations] = useCollectionData(conversationsQuery, {
    idField: 'id',
  });

  const noReadMessages = conversations?.some(
    c => c?.lastMessage?.readBy?.[user?.email] === false,
  );

  return {
    noReadMessages,
  };
};
