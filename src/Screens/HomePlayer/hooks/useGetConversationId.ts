import {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {CONVERSATIONS} from '../../../Models/entities';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';

export const useGetConversationId = () => {
  const {user} = useFirebaseAuth();

  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    let unsbscribe;
    const getConversationsAndCoach = async () => {
      setLoading(true);
      try {
        unsbscribe = firestore()
          .collection(CONVERSATIONS)
          .where('members', '==', [user?.coachEmail, user?.email])
          .onSnapshot(querySnapShot => {
            const conversationsDocs = querySnapShot?.docs?.map(doc => {
              if (doc && doc.exists) {
                return {id: doc.id, ...doc.data()};
              }
            });
            console.log('CONV');
            setConversations(conversationsDocs);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.coachId) {
      getConversationsAndCoach();
      return unsbscribe;
    }
  }, [user?.coachId]);

  return {
    loading,
    conversationId: conversations?.[0]?.id,
  };
};
