export const isSameUser = (p1, p2) => p1.id === p2.id;

export const onlyInLeft = (left, right, compareFunction) =>
  left.filter(
    leftValue =>
      !right.some(rightValue => compareFunction(leftValue, rightValue)),
  );
