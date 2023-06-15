export const useResumeStatistics = ({statistics}) => {
  const generateResumen = dataSet => {
    return {
      vd: dataSet?.values?.[0]?.value || 0,
      vr: dataSet?.values?.[1]?.value || 0,
      fd: dataSet?.values?.[2]?.value || 0,
      fr: dataSet?.values?.[3]?.value || 0,
      bd: dataSet?.values?.[4]?.value || 0,
      br: dataSet?.values?.[5]?.value || 0,
      bj: dataSet?.values?.[6]?.value || 0,
      sm: dataSet?.values?.[7]?.value || 0,
      gl: dataSet?.values?.[8]?.value || 0,
      x3: dataSet?.values?.[9]?.value || 0,
      x4: dataSet?.values?.[10]?.value || 0,
    };
  };

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
    x3: x3W,
    x4: x4W,
  } = statistics && generateResumen(statistics?.[0]);

  const totalW =
    vdW + vrW + fdW + frW + bdW + brW + bjW + smW + glW + x3W + x4W;

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
    x3: x3Ef,
    x4: x4Ef,
  } = statistics && generateResumen(statistics?.[2]);

  const totalEf =
    vdEf + vrEf + fdEf + frEf + bdEf + brEf + bjEf + smEf + glEf + x3Ef + x4Ef;

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
    x3: x3Nf,
    x4: x4Nf,
  } = statistics && generateResumen(statistics?.[1]);

  const totalNf =
    vdNf + vrNf + fdNf + frNf + bdNf + brNf + bjNf + smNf + glNf + x3Nf + x4Nf;

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
    x3W,
    x4W,
    vdEf,
    vrEf,
    fdEf,
    frEf,
    bdEf,
    brEf,
    bjEf,
    smEf,
    glEf,
    x3Ef,
    x4Ef,
    vdNf,
    vrNf,
    fdNf,
    frNf,
    bdNf,
    brNf,
    bjNf,
    smNf,
    glNf,
    x3Nf,
    x4Nf,
    totalW,
    totalEf,
    totalNf,
  };
};
