import type { CircleCoordinates, CircleType } from '@/types/CircleTypes';
import type { MovingDirections } from '@/types/MovingTypes';

import { CircleTypeEnum } from '@/types/CircleTypes';

import { getCircleDeltaCoords, getDistance, isInBoard, updateCoords } from './geometry';

export const isHexEmpty = (
  coords: CircleCoordinates,
  circles: CircleType[]
): boolean => !circles.some(
  (circle) => circle.coords.line === coords.line && circle.coords.diagonal === coords.diagonal
);

export const checkForParall = (
  circlesChecked: CircleType[],
  moving: MovingDirections,
  circles: CircleType[]
): boolean => {
  const line = circlesChecked[0].coords.line;
  const diagonal = circlesChecked[0].coords.diagonal;

  const isOneLine = circlesChecked.reduce((acc, el) => acc && el.coords.line === line, true);
  const isOneDiagonal = circlesChecked.reduce(
    (acc, el) => acc && el.coords.diagonal === diagonal,
    true
  );

  let sortedCircledChecked = circlesChecked.sort((a, b) => a.coords.diagonal - b.coords.diagonal);

  const initRes = {
    res: true,
    prevCoords: {
      line: sortedCircledChecked[0].coords.line,
      diagonal: sortedCircledChecked[0].coords.diagonal
    }
  };
  const isOneOtherDiagonal = sortedCircledChecked.reduce((acc, item) => {
    const lineDist = item.coords.line - acc.prevCoords.line;
    const diagonalDist = item.coords.diagonal - acc.prevCoords.diagonal;
    // eslint-disable-next-line style/max-len
    const status = (lineDist === -1 || lineDist === 0) && (diagonalDist === 1 || diagonalDist === 0);

    return {
      res: acc.res && status,
      prevCoords: item.coords
    };
  }, initRes).res;

  let res = isOneLine || isOneDiagonal || isOneOtherDiagonal;

  // Проверка, свободна ли лунка по-направлению движения
  res = res && circlesChecked.reduce((acc, circle) => {
    const nextHexCoords = updateCoords(circle.coords, getCircleDeltaCoords(moving));

    return acc && isInBoard(nextHexCoords) && isHexEmpty(nextHexCoords, circles);
  }, true);

  // Проверка, находятся ли фишки рядом
  sortedCircledChecked = circlesChecked.sort((a, b) => getDistance(a.coords, b.coords));
  res = res && sortedCircledChecked.reduce((acc, item) => {
    const status = getDistance(acc.prevCoords, item.coords) <= 1;

    return {
      res: acc.res && status,
      prevCoords: item.coords
    };
  }, initRes).res;

  return res;
};

export const getCircleLine = (
  circleChecked: CircleType,
  moving: MovingDirections,
  circles: CircleType[]
):
CircleType[] => {
  const deltaCoords = getCircleDeltaCoords(moving);
  const circleLine = [circleChecked];

  let nextCoords = updateCoords(circleLine[circleLine.length - 1].coords, deltaCoords);

  while (isInBoard(nextCoords) && !isHexEmpty(nextCoords, circles)) {
    circleLine.push(
      circles.find(
        (circle) => circle.coords.line === nextCoords.line &&
          circle.coords.diagonal === nextCoords.diagonal
      )!
    );
    nextCoords = updateCoords(circleLine[circleLine.length - 1].coords, deltaCoords);
  }

  return circleLine;
};

export const getEmemyTeam = (team: CircleTypeEnum): CircleTypeEnum =>
  team === CircleTypeEnum.Black ? CircleTypeEnum.White : CircleTypeEnum.Black;

export const checkForLinear = (
  circleLine: CircleType[],
  moving: MovingDirections,
  currentTeam: CircleTypeEnum
): boolean => {
  let res = true;
  const deltaCoords = getCircleDeltaCoords(moving);
  const enemyTeam = getEmemyTeam(currentTeam);

  const myTeamCircleCount = circleLine.filter((circle) => circle.type === currentTeam).length;
  const enemyCircleCount = circleLine.filter((circle) => circle.type === enemyTeam).length;
  const isEndBoard = !isInBoard(
    updateCoords(circleLine[circleLine.length - 1].coords, deltaCoords)
  );
  const firstEnemyCoords = circleLine.find((circle) => circle.type === enemyTeam)?.coords;
  const lastMyCircle = circleLine.toReversed().find((circle) => circle.type === currentTeam);

  if (!lastMyCircle) {
    return false;
  }

  if (myTeamCircleCount > 3) {
    res &&= false;
  }
  else if (enemyCircleCount > 0)
  {
    if (enemyCircleCount >= myTeamCircleCount)
      res &&= false;

    const expectedEnemyCoords = updateCoords(lastMyCircle.coords, deltaCoords);

    if (
      firstEnemyCoords!.line !== expectedEnemyCoords.line ||
      firstEnemyCoords!.diagonal !== expectedEnemyCoords.diagonal
    ) {
      res &&= false;
    }
  }
  else if (enemyCircleCount === 0 && isEndBoard) {
    res &&= false;
  }
  else {
    res &&= true;
  }

  return res;
};
