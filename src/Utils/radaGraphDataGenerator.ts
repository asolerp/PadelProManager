import t from '../Theme/theme';

const shapeStyles = {
  fill: '#FAFAFA',
};

const axisStyles = {
  stroke: '#000',
  strokeWidth: 0.5,
};

const scaleStyles = {
  fill: '#FAFAFA',
  stroke: '#000',
  strokeWidth: 1,
};

const dotStyles = {
  backgroundColor: 'white',
  stroke: '#e7e8e7',
  borderRadius: 5,
};

const captionStyles = {
  fill: '#000',
  fontWeight: 'bold',
  textShadow: '1px 1px 0 #000',
};

const DEFAULT_CAPTIONS = {
  // columns
  fd: 'Fondo derecha',
  fr: 'Fondo revés',
  vd: 'Volea derecha',
  vr: 'Volea revés',
  bd: 'Bajada derecha',
  br: 'Bajada revés',
  bj: 'Bandeja',
  sm: 'Smash',
  gl: 'Globo',
  x3: 'Por 3',
  x4: 'Por 4',
};

const emptyState = {
  fd: 0,
  fr: 0,
  vd: 0,
  vr: 0,
  bd: 0,
  br: 0,
  bj: 0,
  sm: 0,
  gl: 0,
  x3: 0,
  x4: 0,
};

const getHigherShotNumber = shot =>
  Math.max(
    ...Object.entries(shot).map(([key, value]) => {
      if (key !== 'count') {
        return value;
      }
      return null;
    }),
  );

const getKeyWithHigherShot = (shots, val) => {
  const findedKeyObject = Object.entries(shots).find(
    ([key, value]) => value === val,
  );
  return findedKeyObject?.[1] > 0 ? findedKeyObject?.[0] : 'none';
};

const generateShotData = shot => {
  if (!shot) {
    return {...emptyState};
  }

  const shotsWithoutCount = Object.fromEntries(
    Object.entries(shot).filter(([key, value]) => key !== 'count'),
  );

  console.log('shotsWithoutCount', shotsWithoutCount);

  const higherShotNumber = getHigherShotNumber(shotsWithoutCount);

  const keyHigherShot = getKeyWithHigherShot(
    shotsWithoutCount,
    higherShotNumber,
  );

  if (keyHigherShot === 'none') {
    return {...emptyState};
  }

  const shotsWithoutHigherKeyShot = Object.fromEntries(
    Object.entries(shotsWithoutCount).filter(
      ([key, value]) => key !== keyHigherShot,
    ),
  );

  const copyEmptyState = {...emptyState};

  copyEmptyState[keyHigherShot] = 1;

  const response = Object.entries(shotsWithoutHigherKeyShot).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value / shot[keyHigherShot],
    }),
    copyEmptyState,
  );

  return response;
};

export const radarGraphDataGenerator = (
  playerStatistics: any,
  mode: string = 'white',
) => {
  console.log('playerStatistics', playerStatistics);

  const isDark = mode !== 'white';

  let options = {};

  if (isDark) {
    options = {
      axisProps: () => ({...axisStyles}),
      scaleProps: () => ({...scaleStyles, fill: 'none'}),
      shapeProps: () => ({...shapeStyles}),
      dotProps: () => ({
        dotStyles,
      }),
      captionProps: () => ({
        ...captionStyles,
        textAnchor: 'middle',
        fontSize: 12,
      }),
    };
  }

  const w = playerStatistics?.w || undefined;
  const nf = playerStatistics?.nf || undefined;
  const ef = playerStatistics?.ef || undefined;

  const data = {
    name: 'Player stats',
    captions: DEFAULT_CAPTIONS,
    chart: [
      // data
      {
        data: generateShotData(ef),
        meta: {
          color: t.bgInfo.backgroundColor,
          strokeWidth: 2,
        },
      },
      {
        data: generateShotData(nf),
        meta: {
          color: t.bgError.backgroundColor,
          strokeWidth: 2,
        },
      },
      {
        data: generateShotData(w),
        meta: {
          color: t.bgSuccess.backgroundColor,
          strokeWidth: 2,
        },
      },
    ],
    options: isDark ? options : {},
  };

  console.log('PLAYER STATS', data);

  return data;
};
