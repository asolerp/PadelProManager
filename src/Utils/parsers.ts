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

export const roundParser = {
  quarter: 'Cuartos de final',
};

export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const firstSurname = str => {
  return str.split(' ')[0];
};

export const colorByCategory = {
  1: 'primary',
  2: 'secondary',
  3: 'info',
  4: 'warning',
  5: 'error',
};

export const categoryParse = {
  PRO: 'PRO',
  1: 'Primera',
  2: 'Segunda',
  3: 'Tercera',
  4: 'Cuarta',
  5: 'Quinta',
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
