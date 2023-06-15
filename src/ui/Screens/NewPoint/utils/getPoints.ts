import {
  BAJADA_DERECHA,
  BAJADA_REVES,
  BANDEJA,
  FONDO_DERECHA,
  FONDO_REVES,
  GLOBO,
  SMASH,
  VOLEA_DERECHA,
  VOLEA_REVES,
  X3,
  X4,
} from '../../../Utils/constants';

const mapPointColor = {
  w: 'success',
  ef: 'info',
  nf: 'error',
};

export const getPoints = point => [
  {
    label: 'FD',
    mainColor: mapPointColor[point] || 'grey',
    type: FONDO_DERECHA,
  },
  {
    label: 'FR',
    mainColor: mapPointColor[point] || 'grey',
    type: FONDO_REVES,
  },
  {
    label: 'VD',
    mainColor: mapPointColor[point] || 'grey',
    type: VOLEA_DERECHA,
  },
  {
    label: 'VR',
    mainColor: mapPointColor[point] || 'grey',
    type: VOLEA_REVES,
  },
  {
    label: 'BD',
    mainColor: mapPointColor[point] || 'grey',
    type: BAJADA_DERECHA,
  },
  {
    label: 'BR',
    mainColor: mapPointColor[point] || 'grey',
    type: BAJADA_REVES,
  },
  {
    label: 'BJ',
    mainColor: mapPointColor[point] || 'grey',
    type: BANDEJA,
  },
  {
    label: 'SM',
    mainColor: mapPointColor[point] || 'grey',
    type: SMASH,
  },
  {
    label: 'GL',
    mainColor: mapPointColor[point] || 'grey',
    type: GLOBO,
  },
  {
    label: 'x3',
    mainColor: mapPointColor[point] || 'grey',
    type: X3,
  },
  {
    label: 'x4',
    mainColor: mapPointColor[point] || 'grey',
    type: X4,
  },
];
