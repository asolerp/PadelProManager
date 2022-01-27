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

export const colorByCategory = {
  1: 'primary',
  2: 'secondary',
  3: 'info',
  4: 'warning',
  5: 'error',
};

export const handParse = {
  left: 'Zurdo',
  right: 'Diestro',
};

export const colorByHand = {
  left: 'primary',
  right: 'warning',
};
