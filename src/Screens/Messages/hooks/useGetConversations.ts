import {useCallback, useState} from 'react';
import {useEffect} from 'react';

import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useGetConversations = () => {
  const {user} = useFirebaseAuth();

  const conversationsFn = defaultFunctions.httpsCallable('getConversations');
  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState();

  const getConversations = useCallback(async () => {
    setLoading(true);
    try {
      const conversationsRes = await conversationsFn({
        userEmail: user?.email,
      });

      const {
        data: {conversationsWithFullMembers},
      } = conversationsRes;

      console.log('CONVER', conversationsWithFullMembers);

      setConversations(
        conversationsWithFullMembers
          .filter(c => c.player)
          .sort(
            (a, b) =>
              b?.lastMessage?.createdAt?._seconds -
              a?.lastMessage?.createdAt?._seconds,
          ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getConversations();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      await Promise.all([getConversations()]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    refetch,
    loading,
    conversations,
  };
};
