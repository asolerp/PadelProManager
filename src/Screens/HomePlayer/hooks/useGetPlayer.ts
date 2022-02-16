import {useEffect, useMemo, useState} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../../../Api/queries';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

import {useGetPlayerByUserId} from '../../../Hooks/useGetPlayerByUserId';

export const useGetPlayer = () => {
  const {player, loading: loadingPlayer} = useGetPlayerByUserId();
  const queryStats = useMemo(
    () => playerQuery.doc(player?.id).collection('stats').doc('global'),
    [player?.id],
  );

  const [stats, loadingStats, errorStats] = useDocumentData(queryStats);

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
  const error = errorStats;

  return {player, error, loading, tw, tl, tm, graphData};
};
