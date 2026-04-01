import type { CircleType } from '@/types/CircleTypes';

import { CircleTypeEnum } from '@/types/CircleTypes';

const prepareCirclesLine = (
  line: number,
  startDiagonal: number,
  circlesCount: number,
  type: CircleTypeEnum
): CircleType[] => {
  const arr: CircleType[] = [];

  for (let diagonal = startDiagonal; diagonal < startDiagonal + circlesCount; diagonal++)
  {
    arr.push({
      // eslint-disable-next-line symbol-description
      id: Symbol(),
      type,
      coords: {
        line,
        diagonal
      },
      isChecked: false,
      isMoving: false
    });
  }

  return arr;
};
export default (): CircleType[] => {
  const arr: CircleType[] = [];

  let circleType = CircleTypeEnum.White;

  arr.push(...prepareCirclesLine(1, 5, 5, circleType));
  arr.push(...prepareCirclesLine(2, 4, 6, circleType));
  arr.push(...prepareCirclesLine(3, 5, 3, circleType));

  circleType = CircleTypeEnum.Black;

  arr.push(...prepareCirclesLine(7, 3, 3, circleType));
  arr.push(...prepareCirclesLine(8, 1, 6, circleType));
  arr.push(...prepareCirclesLine(9, 1, 5, circleType));

  return arr;
};
