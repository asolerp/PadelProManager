export const useResumeStatistics = ({statistics}) => {
  const generateResumen = dataSet => ({
    vd: dataSet.values?.[0]?.value || 0,
    vr: dataSet.values?.[1]?.value || 0,
    fd: dataSet.values?.[2]?.value || 0,
    fr: dataSet.values?.[3]?.value || 0,
    bd: dataSet.values?.[4]?.value || 0,
    br: dataSet.values?.[5]?.value || 0,
    bj: dataSet.values?.[6]?.value || 0,
    sm: dataSet.values?.[7]?.value || 0,
  });

  const {
    vd: vdW,
    vr: vrW,
    fd: fdW,
    fr: frW,
    bd: bdW,
    br: brW,
    bj: bjW,
    sm: smW,
  } = generateResumen(statistics?.[0]);

  const totalW = vdW + vrW + fdW + frW + bdW + brW + bjW + smW;

  const {
    vd: vdEf,
    vr: vrEf,
    fd: fdEf,
    fr: frEf,
    bd: bdEf,
    br: brEf,
    bj: bjEf,
    sm: smEf,
  } = generateResumen(statistics?.[2]);

  const totalEf = vdEf + vrEf + fdEf + frEf + bdEf + brEf + bjEf + smEf;

  const {
    vd: vdNf,
    vr: vrNf,
    fd: fdNf,
    fr: frNf,
    bd: bdNf,
    br: brNf,
    bj: bjNf,
    sm: smNf,
  } = generateResumen(statistics?.[1]);

  const totalNf = vdNf + vrNf + fdNf + frNf + bdNf + brNf + bjNf + smNf;

  return {
    vdW,
    vrW,
    fdW,
    frW,
    bdW,
    brW,
    bjW,
    smW,
    vdEf,
    vrEf,
    fdEf,
    frEf,
    bdEf,
    brEf,
    bjEf,
    smEf,
    vdNf,
    vrNf,
    fdNf,
    frNf,
    bdNf,
    brNf,
    bjNf,
    smNf,
    totalW,
    totalEf,
    totalNf,
  };
};
