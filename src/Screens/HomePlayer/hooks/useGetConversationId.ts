import {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../../../Context/AuthContex';
import firestore from '@react-native-firebase/firestore';
import {CONVERSATIONS, USERS} from '../../../Models/entities';

export const useGetConversationId = () => {
  const {user} = useContext(AuthContext);
  const [conversations, setConversations] = useState();
  const [coach, setCoach] = useState();
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
            setConversations(conversationsDocs);
          });

        const coachQuery = await firestore()
          .collection(USERS)
          .doc(user?.coachId)
          .get();

        const coachDoc = coachQuery.data();
        setCoach(coachDoc);
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
    coach,
    loading,
    conversationId: conversations?.[0]?.id,
  };
};
