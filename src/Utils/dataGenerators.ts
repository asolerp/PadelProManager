import {processColor} from 'react-native';
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

export const tableDataGenerator = (playerStatistics: any) => {
  const w = playerStatistics?.w || 0;
  const nf = playerStatistics?.nf || 0;
  const ef = playerStatistics?.ef || 0;

  const data = {
    dataSets: [
      {
        values: [
          {value: w?.vd || 0},
          {value: w?.vr || 0},
          {value: w?.fd || 0},
          {value: w?.fr || 0},
          {value: w?.bd || 0},
          {value: w?.br || 0},
          {value: w?.bj || 0},
          {value: w?.sm || 0},
          {value: w?.gl || 0},
          {value: w?.x3 || 0},
          {value: w?.x4 || 0},
        ],
        label: 'Winners',
        config: {
          color: processColor('#4caf50'),
          drawFilled: true,
          drawValues: false,
          fillColor: processColor('#4caf50'),
          fillAlpha: 100,
          lineWidth: 2,
        },
      },
      {
        values: [
          {value: nf?.vd || 0},
          {value: nf?.vr || 0},
          {value: nf?.fd || 0},
          {value: nf?.fr || 0},
          {value: nf?.bd || 0},
          {value: nf?.br || 0},
          {value: nf?.bj || 0},
          {value: nf?.sm || 0},
          {value: nf?.gl || 0},
          {value: nf?.x3 || 0},
          {value: nf?.x4 || 0},
        ],
        label: 'Errores no forzados',
        config: {
          color: processColor('#f44336'),
          drawFilled: true,
          drawValues: false,
          fillColor: processColor('#f44336'),
        },
      },
      {
        values: [
          {value: ef?.vd || 0},
          {value: ef?.vr || 0},
          {value: ef?.fd || 0},
          {value: ef?.fr || 0},
          {value: ef?.bd || 0},
          {value: ef?.br || 0},
          {value: ef?.bj || 0},
          {value: ef?.sm || 0},
          {value: ef?.gl || 0},
          {value: ef?.x3 || 0},
          {value: ef?.x4 || 0},
        ],
        label: 'Errors forced',
        config: {
          color: processColor('#2196f3'),
          drawFilled: true,
          drawValues: false,
          fillColor: processColor('#2196f3'),
          fillAlpha: 100,
          lineWidth: 2,
        },
      },
    ],
  };
  return data;
};

export const radarGraphDataGenerator = (
  playerStatistics: any,
  mode: string = 'white',
) => {
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

  return data;
};
