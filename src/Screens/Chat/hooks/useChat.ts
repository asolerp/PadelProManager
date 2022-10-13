import firestore from '@react-native-firebase/firestore';

import {useContext, useEffect, useMemo, useState} from 'react';

import {useCollectionData} from 'react-firebase-hooks/firestore';
import {AuthContext} from '../../../Context/AuthContex';

import {
  CHATS,
  CONVERSATIONS,
  GROUPS,
  MESSAGES,
  USERS,
} from '../../../Models/entities';

export const useChat = ({conversationId, chatTitle}) => {
  const [chatTitleFromDB, setChatTitleFromDB] = useState();

  const {user} = useContext(AuthContext);
  const chatQuery = useMemo(
    () =>
      firestore()
        .collection(CHATS)
        .doc(conversationId)
        .collection(MESSAGES)
        .orderBy('createdAt', 'desc'),
    [conversationId],
  );

  const [messages] = useCollectionData(chatQuery, {
    idField: 'id',
  });

  useEffect(() => {
    const getChatTitle = async () => {
      const converRef = firestore()
        .collection(CONVERSATIONS)
        .doc(conversationId);

      const converQuery = await converRef.get();
      const converDoc = converQuery.data();

      if (converDoc.type === 2) {
        const groupRef = firestore().collection(GROUPS).doc(converDoc.groupId);
        const groupQuery = await groupRef.get();
        const grouopDoc = groupQuery.data();

        return setChatTitleFromDB(grouopDoc.groupName);
      }

      const member = converDoc.members.filter(m => m !== user?.email)[0];

      const userRef = firestore()
        .collection(USERS)
        .where('email', '==', member);
      const userQuery = await userRef.get();
      const userDoc = userQuery.docs.map(d => ({id: d.id, ...d.data()}));

      return setChatTitleFromDB(
        `${userDoc[0].firstName} ${userDoc[0].secondName}`,
      );
    };
    if (!chatTitle) {
      getChatTitle();
    }
  }, [chatTitle, conversationId, user?.email]);

  useEffect(() => {
    const updateReadBY = async () => {
      if (messages) {
        if (messages.length === 0) {
          return;
        }

        const converRef = firestore()
          .collection(CONVERSATIONS)
          .doc(conversationId);

        const converQuery = await converRef.get();
        const converDoc = converQuery.data();

        await converRef.update({
          ['lastMessage.readBy']: {
            ...converDoc.lastMessage.readBy,
            [user?.email]: true,
          },
        });
      }
    };
    updateReadBY();
  }, [conversationId, messages]);

  const saveMessage = async message => {
    const converRef = await firestore()
      .collection(CONVERSATIONS)
      .doc(conversationId)
      .get();

    const converData = {id: converRef.id, ...converRef.data()};

    const readByMessage = converData?.members.reduce((acc, m) => {
      return {
        ...acc,
        [m]: m === user?.email,
      };
    }, {});

    await firestore()
      .collection(CONVERSATIONS)
      .doc(conversationId)
      .update({
        lastMessage: {...message[0], readBy: readByMessage},
      });
    await firestore()
      .collection(CHATS)
      .doc(conversationId)
      .collection(MESSAGES)
      .add(message[0]);
  };

  return {
    messages,
    saveMessage,
    chatTitleFromDB,
  };
};
