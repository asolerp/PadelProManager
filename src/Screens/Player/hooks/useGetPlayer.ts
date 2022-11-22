import {useEffect, useState} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../../../Api/queries';
import {
  radarGraphDataGenerator,
  tableDataGenerator,
} from '../../../Utils/dataGenerators';

import firestore from '@react-native-firebase/firestore';

import {useFirebaseAuth} from '../../../Context/FirebaseContext';

export const useGetPlayer = (playerId: string, playerEmail: string) => {
  const {user} = useFirebaseAuth();

  const [player, loadingPlayer, errorPlayer] = useDocumentData(
    playerQuery(user?.id).doc(playerId),
    {
      idField: 'id',
    },
  );
  const [stats, loadingStats, errorStats] = useDocumentData(
    firestore().collection('stats').doc(playerEmail),
  );

  console.log('STATS', stats);

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

  const tw = stats?.tw || 0;
  const tl = stats?.tl || 0;
  const tm = stats?.tm || 0;

  const loading = loadingStats || loadingPlayer;
  const error = errorPlayer || errorStats;

  const tableStats = tableDataGenerator(stats);

  return {
    player,
    error,
    loading,
    tableStats,
    tw,
    tl,
    tm,
    graphData,
    conversationId,
  };
};
