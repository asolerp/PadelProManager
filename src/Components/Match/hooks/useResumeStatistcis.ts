export const useResumeStatistics = ({statistics}) => {
  const generateResumen = dataSet => ({
    vd: dataSet?.values?.[0]?.value || 0,
    vr: dataSet?.values?.[1]?.value || 0,
    fd: dataSet?.values?.[2]?.value || 0,
    fr: dataSet?.values?.[3]?.value || 0,
    bd: dataSet?.values?.[4]?.value || 0,
    br: dataSet?.values?.[5]?.value || 0,
    bj: dataSet?.values?.[6]?.value || 0,
    sm: dataSet?.values?.[7]?.value || 0,
    gl: dataSet?.values?.[8]?.value || 0,
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
    gl: glW,
  } = generateResumen(statistics?.[0]);

  const totalW = vdW + vrW + fdW + frW + bdW + brW + bjW + smW + glW;

  const {
    vd: vdEf,
    vr: vrEf,
    fd: fdEf,
    fr: frEf,
    bd: bdEf,
    br: brEf,
    bj: bjEf,
    sm: smEf,
    gl: glEf,
  } = generateResumen(statistics?.[2]);

  const totalEf = vdEf + vrEf + fdEf + frEf + bdEf + brEf + bjEf + smEf + glEf;

  const {
    vd: vdNf,
    vr: vrNf,
    fd: fdNf,
    fr: frNf,
    bd: bdNf,
    br: brNf,
    bj: bjNf,
    sm: smNf,
    gl: glNf,
  } = generateResumen(statistics?.[1]);

  const totalNf = vdNf + vrNf + fdNf + frNf + bdNf + brNf + bjNf + smNf + glNf;

  return {
    vdW,
    vrW,
    fdW,
    frW,
    bdW,
    brW,
    bjW,
    smW,
    glW,
    vdEf,
    vrEf,
    fdEf,
    frEf,
    bdEf,
    brEf,
    bjEf,
    smEf,
    glEf,
    vdNf,
    vrNf,
    fdNf,
    frNf,
    bdNf,
    brNf,
    bjNf,
    smNf,
    glNf,
    totalW,
    totalEf,
    totalNf,
  };
};
