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
