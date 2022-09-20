import {useContext, useEffect, useMemo, useState} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {userQuery} from '../../../Api/queries';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

import {AuthContext} from '../../../Context/AuthContex';

export const useGetPlayer = () => {
  const {user} = useContext(AuthContext);
  console.log('USER', user);
  const queryStats = useMemo(
    () => userQuery.doc(user?.id).collection('stats').doc('global'),
    [user?.id],
  );

  const [stats, loadingStats, errorStats] = useDocumentData(queryStats);

  const [graphData, setGraphData] = useState();

  useEffect(() => {
    console.log('stats', stats);
    if (stats) {
      setGraphData(radarGraphDataGenerator(stats, 'black'));
    }
  }, [stats]);

  const tw = stats?.tw;
  const tl = stats?.tl;
  const tm = stats?.tm;

  const loading = loadingStats;
  const error = errorStats;

  console.log('GRAPHDATA', graphData);

  return {user, error, loading, tw, tl, tm, graphData};
};
