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
    matchStatistics,
    activeSet,
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
        {matchStatistics && (
          <>
            <BarChart
              players={{
                p1: team1?.[0],
                p2: team1?.[1],
                p3: team2?.[0],
                p4: team2?.[1],
              }}
              winners={matchStatistics?.totalWPerPlayer}
              errorForced={matchStatistics?.totalEFPerPlayer}
              nonForced={matchStatistics?.totalNFPerPlayer}
            />
            <SetSelector active={activeSet} setActive={handleSetActiveSet} />
            <StatisticItem
              label="👑 Puntos de oro 👑"
              t1PointCount={matchStatistics?.t1GP}
              t2PointCount={matchStatistics?.t2GP}
              totalCount={matchStatistics?.totalGoldPoints}
            />
            <StatisticItem
              label="Winners"
              t1PointCount={matchStatistics?.t1Tw}
              t2PointCount={matchStatistics?.t2Tw}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Errores no forzados"
              t1PointCount={matchStatistics?.t1Tnf}
              t2PointCount={matchStatistics?.t2Tnf}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Errores forzados al contrario"
              t1PointCount={matchStatistics?.t1Tef}
              t2PointCount={matchStatistics?.t2Tef}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Puntos ganados de volea"
              t1PointCount={matchStatistics?.t1Tv}
              t2PointCount={matchStatistics?.t2Tv}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Puntos ganados desde el fondo"
              t1PointCount={matchStatistics?.t1Tf}
              t2PointCount={matchStatistics?.t2Tf}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Puntos ganados bajada de pared"
              t1PointCount={matchStatistics?.t1TBp}
              t2PointCount={matchStatistics?.t2TBp}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Puntos ganados de bandeja"
              t1PointCount={matchStatistics?.t1TBj}
              t2PointCount={matchStatistics?.t2TBj}
              totalCount={matchStatistics?.totalPoints}
            />
            <StatisticItem
              label="Puntos ganados de smash"
              t1PointCount={matchStatistics?.t1Tsm}
              t2PointCount={matchStatistics?.t2Tsm}
              totalCount={matchStatistics?.totalPoints}
            />
          </>
        )}
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
