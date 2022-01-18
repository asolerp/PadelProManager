import {radarGraphDataGenerator} from '../../../Utils/radaGraphDataGenerator';

export const useStatistics = ({statistics}) => {
  const getStatisticCount = stat => stat || 0;

  // Winners
  const t1Tw = statistics?.total?.pt1?.w?.count;
  const t2Tw = statistics?.total?.pt2?.w?.count;

  // Non-forced
  const t1Tnf = statistics?.total?.pt1?.nf?.count;
  const t2Tnf = statistics?.total?.pt2?.nf?.count;

  // Errores-forced
  const t1Tef = statistics?.total?.pt1?.ef?.count;
  const t2Tef = statistics?.total?.pt2?.ef?.count;

  // Volea
  const t1Tv =
    getStatisticCount(statistics?.total?.pt1?.w?.vd) +
    getStatisticCount(statistics?.total?.pt1?.w?.vr) +
    getStatisticCount(statistics?.total?.pt1?.ef?.vd) +
    getStatisticCount(statistics?.total?.pt1?.ef?.vr);
  const t2Tv =
    getStatisticCount(statistics?.total?.pt2?.w?.vd) +
    getStatisticCount(statistics?.total?.pt2?.w?.vr) +
    getStatisticCount(statistics?.total?.pt2?.ef?.vd) +
    getStatisticCount(statistics?.total?.pt2?.ef?.vr);

  // Fondo
  const t1Tf =
    getStatisticCount(statistics?.total?.pt1?.w?.fd) +
    getStatisticCount(statistics?.total?.pt1?.w?.fr) +
    getStatisticCount(statistics?.total?.pt1?.ef?.fd) +
    getStatisticCount(statistics?.total?.pt1?.ef?.fr);
  const t2Tf =
    getStatisticCount(statistics?.total?.pt2?.w?.fd) +
    getStatisticCount(statistics?.total?.pt2?.w?.fr) +
    getStatisticCount(statistics?.total?.pt2?.ef?.fd) +
    getStatisticCount(statistics?.total?.pt2?.ef?.fr);

  // Bajada de pared
  const t1Tbd =
    getStatisticCount(statistics?.total?.pt1?.w?.bd) +
    getStatisticCount(statistics?.total?.pt1?.w?.br) +
    getStatisticCount(statistics?.total?.pt1?.ef?.bd) +
    getStatisticCount(statistics?.total?.pt1?.ef?.br);
  const t2Tbr =
    getStatisticCount(statistics?.total?.pt2?.w?.bd) +
    getStatisticCount(statistics?.total?.pt2?.w?.br) +
    getStatisticCount(statistics?.total?.pt2?.ef?.bd) +
    getStatisticCount(statistics?.total?.pt2?.ef?.br);

  // Bandeja
  const t1Tbj =
    getStatisticCount(statistics?.total?.pt1?.w?.bj) +
    getStatisticCount(statistics?.total?.pt1?.ef?.bj);

  const t2Tbj =
    getStatisticCount(statistics?.total?.pt2?.w?.bj) +
    getStatisticCount(statistics?.total?.pt2?.ef?.bj);

  // Smash
  const t1Tsm =
    getStatisticCount(statistics?.total?.pt1?.w?.sm) +
    getStatisticCount(statistics?.total?.pt1?.ef?.sm);

  const t2Tsm =
    getStatisticCount(statistics?.total?.pt2?.w?.sm) +
    getStatisticCount(statistics?.total?.pt2?.ef?.sm);

  const dataP1 = radarGraphDataGenerator(statistics?.s1?.pt1?.['1']);
  const dataP2 = radarGraphDataGenerator(statistics?.s1?.pt1?.['2']);
  const dataP3 = radarGraphDataGenerator(statistics?.s1?.pt2?.['3']);
  const dataP4 = radarGraphDataGenerator(statistics?.s1?.pt2?.['4']);

  const totalPoints = statistics?.total?.count;

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
    t1Tbd,
    t2Tbr,
    t1Tbj,
    t2Tbj,
    t1Tsm,
    t2Tsm,
    totalPoints,
  };
};
