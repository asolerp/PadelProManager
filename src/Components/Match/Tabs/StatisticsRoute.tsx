import React, {useContext} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import t from '../../../Theme/theme';
import {PlayerRadarGraph} from '../../Common/PlayerRadarGraph';
import {BarChart} from '../BarChart';
import {useStatistics} from '../hooks/useStatistics';
import {SetSelector} from '../SetSelector';
import {StatisticItem} from '../StatisticItem';
import {BlurView} from '@react-native-community/blur';
import {SubscriptionContext} from '../../../Context/SubscriptionContext';
import {Button} from '../../UI/Button';
import {openScreenWithPush} from '../../../Router/utils/actions';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../../../Screens/PromotionalSubscription/PromotionalSubscription';
import {AuthContext} from '../../../Context/AuthContex';

export const StatisticsRoute = ({team1, team2, free, statistics}) => {
  const {isSubscribed} = useContext(SubscriptionContext);
  const {isAdmin, isCoach} = useContext(AuthContext);

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
        contentContainerStyle={[t.itemsCenter, t.pX4, t.mT5]}>
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
      </ScrollView>
    </>
  );
};
