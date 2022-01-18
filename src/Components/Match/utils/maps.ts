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
