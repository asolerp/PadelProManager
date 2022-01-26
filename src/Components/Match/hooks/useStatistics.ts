import {useEffect, useState} from 'react';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

export const useStatistics = ({team1, team2, statistics}) => {
  const [activeSet, setActiveSet] = useState<string>('total');
  const [t1Tw, setT1Tw] = useState();
  const [t2Tw, setT2Tw] = useState();
  const [t1Tnf, setT1Tnf] = useState();
  const [t2Tnf, setT2Tnf] = useState();
  const [t1Tef, setT1Tef] = useState();
  const [t2Tef, setT2Tef] = useState();
  const [t1Tv, setT1Tv] = useState();
  const [t2Tv, setT2Tv] = useState();
  const [t1Tf, setT1Tf] = useState();
  const [t2Tf, setT2Tf] = useState();
  const [t1Tbp, setT1Tbp] = useState();
  const [t2Tbp, setT2Tbp] = useState();
  const [t1Tbj, setT1Tbj] = useState();
  const [t2Tbj, setT2Tbj] = useState();
  const [t1Tsm, setT1Tsm] = useState();
  const [t2Tsm, setT2Tsm] = useState();
  const [dataP1, setDataP1] = useState();
  const [dataP2, setDataP2] = useState();
  const [dataP3, setDataP3] = useState();
  const [dataP4, setDataP4] = useState();
  const [totalPoints, setTotalPoints] = useState();

  const getStatisticCount = stat => stat || 0;

  const handleSetActiveSet = active => {
    return setActiveSet(active);
  };

  useEffect(() => {
    if (statistics && activeSet) {
      // Winners
      setT1Tw(statistics?.[activeSet]?.team1?.global?.w?.count);
      setT2Tw(statistics?.[activeSet]?.team2?.global?.w?.count);

      // Non-forced
      setT1Tnf(statistics?.[activeSet]?.team1?.global?.nf?.count);
      setT2Tnf(statistics?.[activeSet]?.team2?.global?.nf?.count);

      // Errores-forced
      setT1Tef(statistics?.[activeSet]?.team1?.global?.ef?.count);
      setT2Tef(statistics?.[activeSet]?.team2?.global?.ef?.count);

      // Volea
      setT1Tv(
        getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.vr) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.vr),
      );
      setT2Tv(
        getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.vr) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.vd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.vr),
      );

      // Fondo
      setT1Tf(
        getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.fr) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.fr),
      );
      setT2Tf(
        getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.fr) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.fd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.fr),
      );

      // Bajada de pared
      setT1Tbp(
        getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.br) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.br),
      );
      setT2Tbp(
        getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.br) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.bd) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.br),
      );

      // Bandeja
      setT1Tbj(
        getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.bj) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.bj),
      );
      setT2Tbj(
        getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.bj) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.bj),
      );

      // Smash
      setT1Tsm(
        getStatisticCount(statistics?.[activeSet]?.team1?.global?.w?.sm) +
          getStatisticCount(statistics?.[activeSet]?.team1?.global?.ef?.sm),
      );
      setT2Tsm(
        getStatisticCount(statistics?.[activeSet]?.team2?.global?.w?.sm) +
          getStatisticCount(statistics?.[activeSet]?.team2?.global?.ef?.sm),
      );
      setDataP1(
        radarGraphDataGenerator(
          statistics?.[activeSet]?.team1?.players?.[team1?.[0]?.id],
        ),
      );
      setDataP2(
        radarGraphDataGenerator(
          statistics?.[activeSet]?.team1?.players?.[team1?.[1]?.id],
        ),
      );
      setDataP3(
        radarGraphDataGenerator(
          statistics?.[activeSet]?.team2?.players?.[team2?.[0]?.id],
        ),
      );
      setDataP4(
        radarGraphDataGenerator(
          statistics?.[activeSet]?.team2?.players?.[team2?.[1]?.id],
        ),
      );

      setTotalPoints(statistics?.[activeSet]?.count);
    }
  }, [statistics, activeSet, team1, team2]);

  return {
    dataP1,
    dataP2,
    dataP3,
    dataP4,
    t1Tw,
    t2Tw,
    t1Tnf,
    t2Tnf,
    t1Tef,
    t2Tef,
    t1Tv,
    t2Tv,
    t1Tf,
    t2Tf,
    t1Tbp,
    t2Tbp,
    t1Tbj,
    t2Tbj,
    t1Tsm,
    t2Tsm,
    activeSet,
    totalPoints,
    handleSetActiveSet,
  };
};
