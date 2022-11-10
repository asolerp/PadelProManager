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
  fd: 0.5,
  fr: 0.5,
  vd: 0.5,
  vr: 0.5,
  bd: 0.5,
  br: 0.5,
  bj: 0.5,
  sm: 0.5,
  gl: 0.5,
  x3: 0.5,
  x4: 0.5,
};

const generateKeyValue = keyValue => {
  if (keyValue < 1) {
    if (keyValue > 0.1) {
      return keyValue;
    }
    return 0.1;
  }
  return 1;
};

const generateShotData = (w, ef, nf) => {
  if (!w && !ef && !nf) {
    return {...emptyState};
  }

  const shotsWWithoutCount =
    w &&
    Object.fromEntries(Object.entries(w)?.filter(([key]) => key !== 'count'));

  const shotsEFWithoutCount =
    ef &&
    Object.fromEntries(Object.entries(ef)?.filter(([key]) => key !== 'count'));

  const shotsNFWithoutCount =
    nf &&
    Object.fromEntries(Object.entries(nf)?.filter(([key]) => key !== 'count'));

  const copyEmptyState = {...emptyState};

  const response = Object.entries(emptyState).reduce((acc, [key]) => {
    const keyValue =
      emptyState[key] +
      (shotsWWithoutCount?.[key] || 0) * 0.15 +
      (shotsEFWithoutCount?.[key] || 0) * 0.05 -
      (shotsNFWithoutCount?.[key] || 0) * 0.2;

    return {
      ...acc,
      [key]: generateKeyValue(keyValue),
    };
  }, copyEmptyState);

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
        data: generateShotData(w, ef, nf),
        meta: {
          color: '#FF5B42',
          strokeWidth: 3,
        },
      },
    ],
    options: isDark ? options : {},
  };

  return data;
};
