import React from 'react';
import {ScrollView, View} from 'react-native';
import t from '../../../Theme/theme';
import {PlayerRadarGraph} from '../../Common/PlayerRadarGraph';
import {StatsPro} from '../../PadelPro/StatsPro';
// import {BarChart} from '../BarChart';
import {useStatistics} from '../hooks/useStatistics';
import {SetSelector} from '../SetSelector';
import {StatisticItem} from '../StatisticItem';

export const StatisticsRoute = ({
  team1,
  team2,
  statistics,
  advanceStats,
  goldPoint,
}) => {
  const {
    dataP1,
    dataP2,
    dataP3,
    dataP4,
    tableP1,
    tableP2,
    tableP3,
    tableP4,
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
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.itemsCenter, t.pX4]}>
        {matchStatistics && (
          <>
            {/* <BarChart
              players={{
                p1: team1?.[0],
                p2: team1?.[1],
                p3: team2?.[0],
                p4: team2?.[1],
              }}
              winners={matchStatistics?.totalWPerPlayer}
              errorForced={matchStatistics?.totalEFPerPlayer}
              nonForced={matchStatistics?.totalNFPerPlayer}
            /> */}
            {advanceStats ? (
              <>
                <SetSelector
                  active={activeSet}
                  setActive={handleSetActiveSet}
                />
                <StatisticItem
                  label="🎾 Total puntos ganados 🎾"
                  t1PointCount={matchStatistics?.totalT1PointsWins}
                  t2PointCount={matchStatistics?.totalT2PointsWins}
                  withBar={false}
                />
                {goldPoint && (
                  <StatisticItem
                    label="👑 Puntos de oro 👑"
                    t1PointCount={matchStatistics?.t1GP}
                    t2PointCount={matchStatistics?.t2GP}
                    totalCount={matchStatistics?.totalGoldPoints}
                  />
                )}
                <StatisticItem
                  label="Winners"
                  t1PointCount={matchStatistics?.t1Tw}
                  t2PointCount={matchStatistics?.t2Tw}
                  totalCount={matchStatistics?.totalWinners}
                />
                <StatisticItem
                  label="Errores no forzados"
                  t1PointCount={matchStatistics?.t1Tnf}
                  t2PointCount={matchStatistics?.t2Tnf}
                  totalCount={matchStatistics?.totalNF}
                />
                <StatisticItem
                  label="Errores forzados al contrario"
                  t1PointCount={matchStatistics?.t1Tef}
                  t2PointCount={matchStatistics?.t2Tef}
                  totalCount={matchStatistics?.totalEF}
                />
                <StatisticItem
                  label="Puntos ganados de volea"
                  t1PointCount={matchStatistics?.t1Tv}
                  t2PointCount={matchStatistics?.t2Tv}
                  totalCount={matchStatistics?.t1Tv + matchStatistics?.t2Tv}
                />
                <StatisticItem
                  label="Puntos ganados desde el fondo"
                  t1PointCount={matchStatistics?.t1Tf}
                  t2PointCount={matchStatistics?.t2Tf}
                  totalCount={matchStatistics?.t1Tf + matchStatistics?.t2Tf}
                />
                <StatisticItem
                  label="Puntos ganados bajada de pared"
                  t1PointCount={matchStatistics?.t1TBp}
                  t2PointCount={matchStatistics?.t2TBp}
                  totalCount={matchStatistics?.t1TBp + matchStatistics?.t2TBp}
                />
                <StatisticItem
                  label="Puntos ganados de bandeja"
                  t1PointCount={matchStatistics?.t1TBj}
                  t2PointCount={matchStatistics?.t2TBj}
                  totalCount={matchStatistics?.t1TBj + matchStatistics?.t2TBj}
                />
                <StatisticItem
                  label="Puntos ganados de smash"
                  t1PointCount={matchStatistics?.t1Tsm}
                  t2PointCount={matchStatistics?.t2Tsm}
                  withBar={false}
                />
              </>
            ) : (
              <View style={[t.flexGrow, t.wFull, t.mT2]}>
                <SetSelector
                  active={activeSet}
                  setActive={handleSetActiveSet}
                />
                <StatsPro
                  matchStatistics={matchStatistics}
                  goldPoint={goldPoint}
                />
              </View>
            )}
          </>
        )}
        {advanceStats && (
          <View style={[t.mT5, t.itemsCenter]}>
            {dataP1 && team1?.[0] && (
              <PlayerRadarGraph
                withBlur={false}
                player={team1?.[0]}
                data={dataP1}
                table={tableP1}
              />
            )}
            {dataP2 && team1?.[1] && (
              <PlayerRadarGraph
                withBlur={false}
                player={team1?.[1]}
                data={dataP2}
                table={tableP2}
              />
            )}
            {dataP3 && team2?.[0] && (
              <PlayerRadarGraph
                withBlur={false}
                player={team2?.[0]}
                data={dataP3}
                table={tableP3}
              />
            )}
            {dataP4 && team2?.[1] && (
              <PlayerRadarGraph
                withBlur={false}
                player={team2?.[1]}
                data={dataP4}
                table={tableP4}
              />
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};
