import type { CircleType, CircleTypeEnum } from '@/types/CircleTypes';

import { MovingDirections, MovingTypes } from '@/types/MovingTypes';

import { checkForLinear, checkForParall, getCircleLine, getEmemyTeam } from './checkMoving';
import { getCircleDeltaCoords, isInBoard, updateCoords } from './geometry';
import movingMap from './types/movingMap';

type changeTeam = () => void;
type setCircles = (circles: CircleType[]) => void;
type setIsErrorMove = (isError: boolean) => void;
type increaseScore = (team: CircleTypeEnum) => void;
type setMoving = (currentMoving: MovingDirections) => void;

export interface MoveParams {
  changeTeam: changeTeam,
  circles: CircleType[],
  currentTeam: CircleTypeEnum,
  increaseScore: increaseScore,
  moveDirection: MovingDirections,
  setCircles: setCircles,
  setIsErrorMove: setIsErrorMove,
}

export interface CreateMoveParams {
  changeTeam: changeTeam,
  circles: CircleType[],
  currentTeam: CircleTypeEnum,
  increaseScore: increaseScore,
  movingPosition: number,
  setCircles: setCircles,
  setIsErrorMove: setIsErrorMove,
  setMoving: setMoving
}

export const getMovingType = (checkedCount: number): MovingTypes => {
  let res: MovingTypes;

  if (checkedCount === 1) {
    res = MovingTypes.Linear;
  }
  else if (checkedCount > 1) {
    res = MovingTypes.Parallel;
  }
  else {
    res = MovingTypes.None;
  }

  return res;
};

export const move = ({
  changeTeam,
  circles,
  currentTeam,
  increaseScore,
  moveDirection,
  setCircles,
  setIsErrorMove
}: MoveParams) => {
  const circleChecked = circles.filter((c) => c.isChecked === true);
  const movingType = getMovingType(circleChecked.length);

  if (movingType === MovingTypes.Parallel)
  {
    const isGoodMove = checkForParall(circleChecked, moveDirection, circles);

    if (isGoodMove)
    {
      const circlesNew = circles.map((circle) => {
        if (!circle.isChecked) return circle;

        return {
          ...circle,
          isMoving: true,
          coords: updateCoords(circle.coords, getCircleDeltaCoords(moveDirection))
        };
      });
      changeTeam();
      setCircles(circlesNew);
    }

    setIsErrorMove(!isGoodMove);
  }
  else if (movingType === MovingTypes.Linear)
  {
    const circleLine = getCircleLine(circleChecked[0], moveDirection, circles);
    const isGoodMove = checkForLinear(circleLine, moveDirection, currentTeam);

    if (isGoodMove)
    {
      const circlesNew = circles.map((circle) => {
        if (!circleLine.some((el) => el.id === circle.id)) return circle;

        const newCoords = updateCoords(circle.coords, getCircleDeltaCoords(moveDirection));

        if (!isInBoard(newCoords))
          increaseScore(getEmemyTeam(circle.type));

        return {
          ...circle,
          isMoving: true,
          coords: newCoords
        };
      });
      changeTeam();
      setCircles(circlesNew);
    }

    setIsErrorMove(!isGoodMove);
  }
};

export const createMove = (params: CreateMoveParams) => {
  const movingCurrent = movingMap.get(params.movingPosition);

  return () => {
    if (movingCurrent !== undefined && movingCurrent !== MovingDirections.NoMove)
    {
      params.setMoving(movingCurrent);
      move({
        changeTeam: params.changeTeam,
        circles: params.circles,
        currentTeam: params.currentTeam,
        increaseScore: params.increaseScore,
        moveDirection: movingCurrent,
        setCircles: params.setCircles,
        setIsErrorMove: params.setIsErrorMove
      });
    }
  };
};
