import React from 'react';
import {ScrollView, View} from 'react-native';
import t from '../../../Theme/theme';
import {PlayerRadarGraph} from '../../Common/PlayerRadarGraph';
import {BarChart} from '../BarChart';
import {useStatistics} from '../hooks/useStatistics';
import {SetSelector} from '../SetSelector';
import {StatisticItem} from '../StatisticItem';

export const StatisticsRoute = ({team1, team2, statistics}) => {
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
    t1GP,
    t2GP,
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
    activeSet,
    totalPoints,
    totalGoldPoints,
    totalWPerPlayer,
    totalEFPerPlayer,
    totalNFPerPlayer,
    handleSetActiveSet,
  } = useStatistics({
    team1,
    team2,
    statistics,
  });

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.itemsCenter, t.pX3, t.mT5]}>
        <BarChart
          players={{
            p1: team1?.[0],
            p2: team1?.[1],
            p3: team2?.[0],
            p4: team2?.[1],
          }}
          winners={totalWPerPlayer}
          errorForced={totalEFPerPlayer}
          nonForced={totalNFPerPlayer}
        />
        <SetSelector active={activeSet} setActive={handleSetActiveSet} />
        <StatisticItem
          label="👑 Puntos de oro 👑"
          t1PointCount={t1GP}
          t2PointCount={t2GP}
          totalCount={totalGoldPoints}
        />
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
        <View style={[t.mT5, t.itemsCenter]}>
          {dataP1 && team1?.[0] && (
            <PlayerRadarGraph player={team1?.[0]} data={dataP1} />
          )}
          {dataP2 && team1?.[1] && (
            <PlayerRadarGraph player={team1?.[1]} data={dataP2} />
          )}
          {dataP3 && team2?.[0] && (
            <PlayerRadarGraph player={team2?.[0]} data={dataP3} />
          )}
          {dataP4 && team2?.[1] && (
            <PlayerRadarGraph player={team2?.[1]} data={dataP4} />
          )}
        </View>
      </ScrollView>
    </>
  );
};
