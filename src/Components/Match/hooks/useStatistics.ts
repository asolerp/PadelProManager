import {useEffect, useState} from 'react';
import {MatchStatistic} from '../../../Global/types';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

export const useStatistics = ({team1, team2, statistics, mode = 'dark'}) => {
  const [activeSet, setActiveSet] = useState<string>('total');
  const [dataP1, setDataP1] = useState();
  const [dataP2, setDataP2] = useState();
  const [dataP3, setDataP3] = useState();
  const [dataP4, setDataP4] = useState();
  const [matchStatistics, setMatchStatistics] = useState<MatchStatistic>();
  const [dataGenerated, setDataGenerated] = useState(false);

  const getStatisticCount = stat => stat || 0;

  const handleSetActiveSet = active => {
    return setActiveSet(active);
  };

  useEffect(() => {
    if (matchStatistics && dataP1 && dataP2 && dataP3 && dataP4) {
      setDataGenerated(true);
    }
  }, [matchStatistics, dataP1, dataP2, dataP3, dataP4]);

  useEffect(() => {
    if (statistics && activeSet) {
      // Gold Points
      setMatchStatistics({
        t1Br: getStatisticCount(
          statistics?.[activeSet]?.team1?.global?.breakpoint,
        ),
        t2Br: getStatisticCount(
          statistics?.[activeSet]?.team2?.global?.breakpoint,
        ),
        t1GP: getStatisticCount(
          statistics?.[activeSet]?.team1?.global?.breakpoint,
        ),
        t2GP: getStatisticCount(
          statistics?.[activeSet]?.team2?.global?.breakpoint,
        ),
        t1Tw: getStatisticCount(
          statistics?.[activeSet]?.team1?.global?.w?.count,
        ),
        t2Tw: getStatisticCount(
          statistics?.[activeSet]?.team2?.global?.w?.count,
        ),
        t1Tnf: getStatisticCount(
          statistics?.[activeSet]?.team1?.global?.nf?.count,
        ),
        t2Tnf: getStatisticCount(
          statistics?.[activeSet]?.team2?.global?.nf?.count,
        ),
        t1Tef: getStatisticCount(
          statistics?.[activeSet]?.team1?.global?.ef?.count,
        ),
        t2Tef: getStatisticCount(
          statistics?.[activeSet]?.team2?.global?.ef?.count,
        ),
        t1Tv:
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.vr) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.vr),
        t2Tv:
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.vr) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.vr),
        t1Tf:
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.fr) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.fr),
        t2Tf:
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.fr) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.fr),
        t1TBp:
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.br) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.br),
        t2TBp:
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.br) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.br),
        t1TBj:
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.bj) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.bj),
        t2TBj:
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.bj) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.bj),
        t1Tsm:
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.sm) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.sm),
        t2Tsm:
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.sm) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.sm),
        t1Tgl:
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.gl) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.gl),
        t2Tgl:
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.gl) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.gl),
        totalWPerPlayer: {
          p1: getStatisticCount(
            statistics?.total?.team1?.players?.[team1?.[0]?.id]?.w?.count,
          ),
          p2: getStatisticCount(
            statistics?.total?.team1?.players?.[team1?.[1]?.id]?.w?.count,
          ),
          p3: getStatisticCount(
            statistics?.total?.team2?.players?.[team2?.[0]?.id]?.w?.count,
          ),
          p4: getStatisticCount(
            statistics?.total?.team2?.players?.[team2?.[1]?.id]?.w?.count,
          ),
        },
        totalEFPerPlayer: {
          p1: getStatisticCount(
            statistics?.total?.team1?.players?.[team1?.[0]?.id]?.ef?.count,
          ),
          p2: getStatisticCount(
            statistics?.total?.team1?.players?.[team1?.[1]?.id]?.ef?.count,
          ),
          p3: getStatisticCount(
            statistics?.total?.team2?.players?.[team2?.[0]?.id]?.ef?.count,
          ),
          p4: getStatisticCount(
            statistics?.total?.team2?.players?.[team2?.[1]?.id]?.ef?.count,
          ),
        },
        totalNFPerPlayer: {
          p1: getStatisticCount(
            statistics?.total?.team1?.players?.[team1?.[0]?.id]?.nf?.count,
          ),
          p2: getStatisticCount(
            statistics?.total?.team1?.players?.[team1?.[1]?.id]?.nf?.count,
          ),
          p3: getStatisticCount(
            statistics?.total?.team2?.players?.[team2?.[0]?.id]?.nf?.count,
          ),
          p4: getStatisticCount(
            statistics?.total?.team2?.players?.[team2?.[1]?.id]?.nf?.count,
          ),
        },
        totalGoldPoints: getStatisticCount(statistics?.[activeSet]?.breakpoint),
        totalPoints: getStatisticCount(statistics?.[activeSet]?.count),
        totalT1PointsWins:
          getStatisticCount(statistics?.total?.team1?.global?.w?.count) +
          getStatisticCount(statistics?.total?.team1?.global?.ef?.count),
        totalT2PointsWins:
          getStatisticCount(statistics?.total?.team2?.global?.w?.count) +
          getStatisticCount(statistics?.total?.team2?.global?.ef?.count),
      });

      console.log('STATISTICS', statistics);

      setDataP1(
        team1?.[0]?.id !== -1 &&
          radarGraphDataGenerator(
            statistics?.[activeSet]?.team1?.players?.[team1?.[0]?.id],
            mode,
          ),
      );
      setDataP2(
        team1?.[1]?.id !== -1 &&
          radarGraphDataGenerator(
            statistics?.[activeSet]?.team1?.players?.[team1?.[1]?.id],
            mode,
          ),
      );
      setDataP3(
        team2?.[0]?.id !== -1 &&
          radarGraphDataGenerator(
            statistics?.[activeSet]?.team2?.players?.[team2?.[0]?.id],
            mode,
          ),
      );
      setDataP4(
        team2?.[1]?.id !== -1 &&
          radarGraphDataGenerator(
            statistics?.[activeSet]?.team2?.players?.[team2?.[1]?.id],
            mode,
          ),
      );
    }
  }, [statistics, activeSet]);

  return {
    dataP1,
    dataP2,
    dataP3,
    dataP4,
    dataGenerated,
    matchStatistics,
    activeSet,
    handleSetActiveSet,
  };
};
