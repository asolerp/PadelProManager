import React from 'react';
import {ScrollView} from 'react-native';
import t from '../../../Theme/theme';
import {PlayerRadarGraph} from '../../Common/PlayerRadarGraph';
import {useStatistics} from '../hooks/useStatistics';
import {StatisticItem} from '../StatisticItem';

export const StatisticsRoute = ({statistics}) => {
  const {
    dataP1,
    dataP2,
    dataP3,
    dataP4,
    t1Tbj,
    t2Tbj,
    t1Tsm,
    t2Tsm,
    t1Tbp,
    t2Tbp,
    t1Tf,
    t2Tf,
    t1Tw,
    t2Tw,
    t1Tnf,
    t2Tnf,
    t1Tef,
    t2Tef,
    t1Tv,
    t2Tv,
    totalPoints,
  } = useStatistics({
    statistics,
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[t.itemsCenter, t.pX3, t.mT5]}>
      <StatisticItem
        label="Winners"
        t1PointCount={t1Tw}
        t2PointCount={t2Tw}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Errores no forzados"
        t1PointCount={t1Tnf}
        t2PointCount={t2Tnf}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Errores forzados al contrario"
        t1PointCount={t1Tef}
        t2PointCount={t2Tef}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Puntos ganados de volea"
        t1PointCount={t1Tv}
        t2PointCount={t2Tv}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Puntos ganados desde el fondo"
        t1PointCount={t1Tf}
        t2PointCount={t2Tf}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Puntos ganados bajada de pared"
        t1PointCount={t1Tbp}
        t2PointCount={t2Tbp}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Puntos ganados de bandeja"
        t1PointCount={t1Tbj}
        t2PointCount={t2Tbj}
        totalCount={totalPoints}
      />
      <StatisticItem
        label="Puntos ganados de smash"
        t1PointCount={t1Tsm}
        t2PointCount={t2Tsm}
        totalCount={totalPoints}
      />
      {dataP1 && <PlayerRadarGraph data={dataP1} />}
      {dataP2 && <PlayerRadarGraph data={dataP2} />}
      {dataP3 && <PlayerRadarGraph data={dataP3} />}
      {dataP4 && <PlayerRadarGraph data={dataP4} />}
    </ScrollView>
  );
};
