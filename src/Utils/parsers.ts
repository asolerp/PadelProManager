export const shortName = (firstName: string, secondName: string): string => {
  const cutedName = firstName[0].toUpperCase();
  return cutedName + '.' + secondName;
};
