export const objectWithoutUndefined = object => {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  );
};
