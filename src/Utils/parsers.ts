import {removeMultipleBlanks} from './removeMultipleBlanks';

export const shortName = (
  pos = 1,
  firstName: string,
  secondName: string,
): string => {
  const cutedName = firstName?.[0]?.toUpperCase();
  if (cutedName && secondName) {
    return cutedName + '.' + secondName;
  }
  return `Jug ${pos}`;
};

export const fullName = (
  pos = 1,
  firstName: string,
  secondName: string,
): string => {
  if (firstName && secondName) {
    return (
      removeMultipleBlanks(firstName.toUpperCase()) +
      ' ' +
      removeMultipleBlanks(secondName.toUpperCase()).split(' ')[0]
    );
  }
  return `JUG ${pos}`;
};

export const parseRound = {
  1: 'Final',
  2: 'Semifinal',
  4: 'Cuartos',
  8: 'Octavos',
  16: 'Dieciseisavos ',
};

export const roundParser = {
  quarter: 'Cuartos de final',
};

export const capitalize = str => {
  return str?.charAt(0).toUpperCase() + str.slice(1);
};

export const firstSurname = str => {
  return str?.split(' ')[0];
};

export const colorByCategory = {
  wpt: 'infoDark',
  premier: 'black',
  1: 'primary',
  2: 'secondary',
  3: 'info',
  4: 'warning',
  5: 'error',
};

export const categoryParse = {
  wpt: 'WPT',
  premier: 'Premier',
  1: 'Primera',
  2: 'Segunda',
  3: 'Tercera',
  4: 'Cuarta',
  5: 'Quinta',
};

export const matchCategoryParser = {
  [-1]: 'WPT',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
};

export const handParse = {
  left: 'Zurdo',
  right: 'Diestro',
};

export const colorByHand = {
  left: 'primary',
  right: 'warning',
};

export const ddmmyyyyDashToDate = ddmmyyyy => {
  const dateParts = ddmmyyyy?.split('-');
  const date = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
  return date;
};

export const ddmmyyyyToDate = ddmmyyyy => {
  const dateParts = ddmmyyyy?.split('/');
  const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return date;
};
