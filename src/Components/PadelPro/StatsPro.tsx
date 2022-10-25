import React from 'react';
import {View} from 'react-native';
import {MatchStatistic} from '../../Global/types';
import {useTranslationWrapper} from '../../Hooks/useTranslationsWrapper';

import {StatItem} from './StatItem';

interface Props {
  matchStatistics: MatchStatistic;
  goldPoint: boolean;
}

export const StatsPro: React.FC<Props> = ({matchStatistics, goldPoint}) => {
  const {loc} = useTranslationWrapper();

  return (
    <>
      <View>
        <StatItem
          t1Value={matchStatistics?.totalT1PointsWins}
          t2Value={matchStatistics?.totalT2PointsWins}
          title={loc('match_stats_total_points_won')}
        />
        <StatItem
          t1Value={`${Math.round(
            (matchStatistics?.totalT1PointsWins /
              (matchStatistics?.totalT1PointsWins +
                matchStatistics?.totalT2PointsWins)) *
              100,
          )}%`}
          t2Value={`${Math.round(
            (matchStatistics?.totalT2PointsWins /
              (matchStatistics?.totalT1PointsWins +
                matchStatistics?.totalT2PointsWins)) *
              100,
          )}%`}
          title={loc('match_stats_%_points_won')}
        />
        <StatItem
          t1Value={`${matchStatistics?.t1WBr}/${matchStatistics?.t1Br}`}
          t2Value={`${matchStatistics?.t2WBr}/${matchStatistics?.t2Br}`}
          title={loc('match_stats_break_points')}
        />
        {goldPoint && (
          <StatItem
            gold
            t1Value={`${matchStatistics?.totalWonGoldPointsT1}/${matchStatistics?.totalGoldPoints}`}
            t2Value={`${matchStatistics?.totalWonGoldPointsT2}/${matchStatistics?.totalGoldPoints}`}
            title={loc('match_stats_gold_points_won')}
          />
        )}
        <StatItem
          t1Value={`${matchStatistics?.totalT1ConsecutiveWon}`}
          t2Value={`${matchStatistics?.totalT2ConsecutiveWon}`}
          title={loc('match_stats_consecutive_points')}
        />
      </View>
    </>
  );
};
