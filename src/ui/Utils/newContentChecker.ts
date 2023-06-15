import isEqual from 'lodash.isequal';

export const newContentChecker = (oldData, newData) => {
  return isEqual(oldData, newData);
};
