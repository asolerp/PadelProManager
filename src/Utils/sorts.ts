export const sortByName = (x, y) => {
  return x.firstName.localeCompare(y.firstName, 'es', {
    ignorePunctuation: true,
  });
};
