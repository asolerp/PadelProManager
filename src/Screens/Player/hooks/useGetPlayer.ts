import {useEffect, useState, useContext} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../../../Api/queries';
import {radarGraphDataGenerator} from '../../../Utils/dataGenerators';
import {AuthContext} from '../../../Context/AuthContex';
import {Roles} from '../../../Global/types';
import firestore from '@react-native-firebase/firestore';
import {USERS} from '../../../Models/entities';

export const useGetPlayer = (playerId: string, playerEmail: string) => {
  const {user} = useContext(AuthContext);

  const [player, loadingPlayer, errorPlayer] = useDocumentData(
    playerQuery(user?.id).doc(playerId),
    {
      idField: 'id',
    },
  );
  const [stats, loadingStats, errorStats] = useDocumentData(
    playerQuery(user?.id).doc(playerId).collection('stats').doc('global'),
  );

  const [graphData, setGraphData] = useState();
  const [conversationId, setConversationId] = useState();

  useEffect(() => {
    const getConversationId = async () => {
      const conversationRef = await firestore()
        .collection('conversations')
        .where('members', '==', [user?.email, player?.email])
        .get();

      const conversations = conversationRef.docs.map(doc => ({id: doc.id}));

      setConversationId(conversations?.[0]?.id);
    };
    if (player) {
      getConversationId();
    }
  }, [player]);

  useEffect(() => {
    if (stats) {
      setGraphData(radarGraphDataGenerator(stats));
    }
  }, [stats]);

  const tw = stats?.tw;
  const tl = stats?.tl;
  const tm = stats?.tm;

  const loading = loadingStats || loadingPlayer;
  const error = errorPlayer || errorStats;

  return {
    player,
    error,
    loading,
    tw,
    tl,
    tm,
    graphData,
    conversationId,
  };
};
