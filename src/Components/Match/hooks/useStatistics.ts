import {useEffect, useState} from 'react';
import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

export const useStatistics = ({statistics}) => {
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

  useEffect(() => {
    if (statistics) {
      // Winners
      setT1Tw(statistics?.total?.pt1?.w?.count);
      setT2Tw(statistics?.total?.pt2?.w?.count);

      // Non-forced
      setT1Tnf(statistics?.total?.pt1?.nf?.count);
      setT2Tnf(statistics?.total?.pt2?.nf?.count);

      // Errores-forced
      setT1Tef(statistics?.total?.pt1?.ef?.count);
      setT2Tef(statistics?.total?.pt2?.ef?.count);

      // Volea
      setT1Tv(
        getStatisticCount(statistics?.total?.pt1?.w?.vd) +
          getStatisticCount(statistics?.total?.pt1?.w?.vr) +
          getStatisticCount(statistics?.total?.pt1?.ef?.vd) +
          getStatisticCount(statistics?.total?.pt1?.ef?.vr),
      );
      setT2Tv(
        getStatisticCount(statistics?.total?.pt2?.w?.vd) +
          getStatisticCount(statistics?.total?.pt2?.w?.vr) +
          getStatisticCount(statistics?.total?.pt2?.ef?.vd) +
          getStatisticCount(statistics?.total?.pt2?.ef?.vr),
      );

      // Fondo
      setT1Tf(
        getStatisticCount(statistics?.total?.pt1?.w?.fd) +
          getStatisticCount(statistics?.total?.pt1?.w?.fr) +
          getStatisticCount(statistics?.total?.pt1?.ef?.fd) +
          getStatisticCount(statistics?.total?.pt1?.ef?.fr),
      );
      setT2Tf(
        getStatisticCount(statistics?.total?.pt2?.w?.fd) +
          getStatisticCount(statistics?.total?.pt2?.w?.fr) +
          getStatisticCount(statistics?.total?.pt2?.ef?.fd) +
          getStatisticCount(statistics?.total?.pt2?.ef?.fr),
      );

      // Bajada de pared
      setT1Tbp(
        getStatisticCount(statistics?.total?.pt1?.w?.bd) +
          getStatisticCount(statistics?.total?.pt1?.w?.br) +
          getStatisticCount(statistics?.total?.pt1?.ef?.bd) +
          getStatisticCount(statistics?.total?.pt1?.ef?.br),
      );
      setT2Tbp(
        getStatisticCount(statistics?.total?.pt2?.w?.bd) +
          getStatisticCount(statistics?.total?.pt2?.w?.br) +
          getStatisticCount(statistics?.total?.pt2?.ef?.bd) +
          getStatisticCount(statistics?.total?.pt2?.ef?.br),
      );

      // Bandeja
      setT1Tbj(
        getStatisticCount(statistics?.total?.pt1?.w?.bj) +
          getStatisticCount(statistics?.total?.pt1?.ef?.bj),
      );
      setT2Tbj(
        getStatisticCount(statistics?.total?.pt2?.w?.bj) +
          getStatisticCount(statistics?.total?.pt2?.ef?.bj),
      );

      // Smash
      setT1Tsm(
        getStatisticCount(statistics?.total?.pt1?.w?.sm) +
          getStatisticCount(statistics?.total?.pt1?.ef?.sm),
      );
      setT2Tsm(
        getStatisticCount(statistics?.total?.pt2?.w?.sm) +
          getStatisticCount(statistics?.total?.pt2?.ef?.sm),
      );
      setDataP1(radarGraphDataGenerator(statistics?.s1?.pt1?.['1']));
      setDataP2(radarGraphDataGenerator(statistics?.s1?.pt1?.['2']));
      setDataP3(radarGraphDataGenerator(statistics?.s1?.pt2?.['3']));
      setDataP4(radarGraphDataGenerator(statistics?.s1?.pt2?.['4']));

      setTotalPoints(statistics?.total?.count);
    }
  }, [statistics]);

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
    totalPoints,
  };
};
