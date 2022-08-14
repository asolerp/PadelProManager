import t from '../../../Theme/theme';

export const mapResult = {
  w: 'hecho un winner',
  nf: 'hecho un error no forzado',
  ef: 'provocado un error no forzado',
};

export const mapPreposicion = {
  w: 'de',
  nf: 'de',
  ef: 'con',
};

export const mapResultBgStyle = {
  w: [t.bgSuccessDark],
  nf: [t.bgErrorDark],
  ef: [t.bgInfoDark],
};

export const mapResultColorStyle = {
  w: [t.textSuccessDark],
  nf: [t.textErrorDark],
  ef: [t.textInfoDark],
};

export const mapShotColorStyles = {
  fd: [t.textInfoDark],
  fr: [t.textInfoDark],
  vd: [t.textWarningDark],
  vr: [t.textWarningDark],
  bd: [t.textErrorDark],
  br: [t.textErrorDark],
  bj: [t.textPrimaryDark],
  sm: [t.textSecondaryDark],
};

export const mapShotNameShort = {
  vd: 'VD',
  vr: 'VR',
  fd: 'FD',
  fr: 'FR',
  gl: 'GL',
  bd: 'BD',
  br: 'BR',
  bj: 'BJ',
  sm: 'SM',
  x3: 'X3',
  x4: 'X4',
};

export const mapShotName = {
  vd: 'volea de derecha',
  vr: 'volea de revés',
  fd: 'fondo de derecha',
  fr: 'fondo de revés',
  gl: 'globo',
  bd: 'bajada de derecha',
  br: 'bajada de revés',
  bj: 'bandeja',
  sm: 'smash',
};
