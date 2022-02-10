import {useEffect, useMemo, useState} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {playerQuery} from '../../../Api/queries';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

import {useGetPlayerId} from '../../Player/hooks/useGetPlayerId';

export const useGetPlayer = () => {
  const {player: p} = useGetPlayerId();
  const queryPlayer = useMemo(() => playerQuery.doc(p?.id), [p?.id]);
  const queryStats = useMemo(
    () => playerQuery.doc(p?.id).collection('stats').doc('global'),
    [p?.id],
  );

  const [player, loadingPlayer, errorPlayer] = useDocumentData(queryPlayer, {
    idField: 'id',
  });
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
  const error = errorPlayer || errorStats;

  return {player, error, loading, tw, tl, tm, graphData};
};
