import {useEffect, useState} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../../../Api/queries';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

export const useGetPlayer = (playerId: string) => {
  const [player, loadingPlayer, errorPlayer] = useDocumentData(
    playerQuery.doc(playerId),
  );
  const [stats, loadingStats, errorStats] = useDocumentData(
    playerQuery.doc(playerId).collection('stats').doc('global'),
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
