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

export const mapShotColorStyles = {
  fd: [t.bgInfo, t.borderInfoDark],
  fr: [t.bgInfo, t.borderInfoDark],
  vd: [t.bgWarning, t.borderWarningDark],
  vr: [t.bgWarning, t.borderWarningDark],
  bd: [t.bgError, t.borderErrorDark],
  br: [t.bgError, t.borderErrorDark],
  bj: [t.bgPrimary, t.borderPrimaryDark],
  sm: [t.bgSecondary, t.borderSecondaryDark],
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
