export const shortName = (firstName: string, secondName: string): string => {
  const cutedName = firstName[0].toUpperCase();
  return cutedName + '.' + secondName;
};

export const roundParser = {
  quarter: 'Cuartos de final',
};

export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
