import {useEffect, useState, useContext} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {playerQuery, userQuery} from '../../../Api/queries';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';
import {AuthContext} from '../../../Context/AuthContex';

export const useGetPlayer = (playerId: string) => {
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

  return {player, error, loading, tw, tl, tm, graphData};
};
