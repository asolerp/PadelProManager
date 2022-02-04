export const sortByName = (x, y) => {
  return x.firstName.localeCompare(y.firstName, 'es', {
    ignorePunctuation: true,
  });
};

export const sortByLabel = (x, y) => {
  return x.label.localeCompare(y.label, 'es', {
    ignorePunctuation: true,
  });
};

export const sortByClubName = (x, y) => {
  return x.club.localeCompare(y.club, 'es', {
    ignorePunctuation: true,
  });
};

export const sortByDate = (x, y) => {
  return x.date.toDate() - y.date.toDate();
};
