import type { CircleCoordinates } from '@/types/CircleTypes';

import { MovingDirections } from '@/types/MovingTypes';

import type DiagonalLimits from './types/DiagonalLimits';

export const updateCoords = (
  coords: CircleCoordinates,
  deltaCoords: CircleCoordinates
): CircleCoordinates => ({
  line: coords.line + deltaCoords.line,
  diagonal: coords.diagonal + deltaCoords.diagonal
});

export const getCircleDeltaCoords = (moveDirection: MovingDirections): CircleCoordinates => {
  let deltaLine = 0;
  let deltaDiagonal = 0;

  switch (moveDirection) {
    case MovingDirections.UpRight:
      deltaLine = -1;
      deltaDiagonal = 1;
      break;
    case MovingDirections.Right:
      deltaDiagonal = 1;
      break;
    case MovingDirections.DownRight:
      deltaLine = 1;
      break;
    case MovingDirections.DownLeft:
      deltaLine = 1;
      deltaDiagonal = -1;
      break;
    case MovingDirections.Left:
      deltaDiagonal = -1;
      break;
    case MovingDirections.UpLeft:
      deltaLine = -1;
      break;
  }

  return { line: deltaLine, diagonal: deltaDiagonal };
};

export const getDiagonalLimitsForLine = (line: number): DiagonalLimits => {
  const res: DiagonalLimits = {
    diagonalStart: -1,
    diagonalEnd: -1
  };

  if (line > 0 && line <= 5) {
    line--;
    res.diagonalEnd = 9;
    res.diagonalStart = 5 - line;
  }
  else if (line > 5 && line <= 9) {
    line = 9 - line;
    res.diagonalStart = 1;
    res.diagonalEnd = 5 + line;
  }

  return res;
};

export const isInBoard = (coords: CircleCoordinates): boolean => {
  let res = false;
  const { line, diagonal } = coords;

  if (line >= 1 && line <= 9)
  {
    const limits = getDiagonalLimitsForLine(line);

    if (diagonal >= limits.diagonalStart && diagonal <= limits.diagonalEnd)
    {
      res = true;
    }
  }

  return res;
};

export const getDistance = (
  coords1: CircleCoordinates,
  coords2: CircleCoordinates
): number => Math.max(
  Math.abs(coords1.diagonal - coords2.diagonal),
  Math.abs(coords1.line - coords2.line)
);
