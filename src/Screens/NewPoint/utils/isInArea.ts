export const isInArea = (x1, y1, x2, y2, x, y) => {
  'worklet';
  if (x > x1 && x < x2 && y > y1 && y < y2) {
    return true;
  }

  return false;
};

export const findInWhatArea = (areas, x, y) => {
  'worklet';
  console.log(areas, x, y);
  const findedArea = Object.entries(areas).find(([key, value]) =>
    isInArea(
      value.x,
      value.y,
      value.x + value.width,
      value.y + value.height,
      x,
      y,
    ),
  );

  if (!findedArea) {
    return;
  }

  return findedArea[1];
};
