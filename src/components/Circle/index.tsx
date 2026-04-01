import clsx from 'clsx';

import type { CircleType } from '@/types/CircleTypes';

import { useGameStore } from '@/store/store';
import { CircleTypeEnum } from '@/types/CircleTypes';
import { MovingDirections } from '@/types/MovingTypes';

import styles from './styles.module.scss';

interface CircleProps extends CircleType {
  moving: MovingDirections,
}

// Не применяется класс movingRight при нажатии на кнопку, а сами анимации работают
const Circle = ({ id, type, isChecked, moving, isMoving }: CircleProps) => {
  const currentTeam = useGameStore((state) => state.team);
  const isError = useGameStore((state) => state.isErrorMove);

  const setIsChecked = useGameStore((state) => state.setChecked);
  const setIsError = useGameStore((state) => state.setIsErrorMove);
  const setIsMoved = useGameStore((state) => state.setMovingCircleById);
  const canICheckCircle = useGameStore((state) => state.canICheckCircles);

  const updateIsChecked = () => {
    const isToChecked = !isChecked;

    if ((isToChecked && canICheckCircle()) || !isToChecked)
      setIsChecked(id, isToChecked);
  };
  const clearIsMoving = () => {
    setIsMoved(id, false);
    setIsChecked(id, false);
  };
  const clearError = () => {
    setIsError(false);
  };

  const getMovingClassName = () => {
    switch (moving) {
      case MovingDirections.UpRight:
        return styles.movingUpRight;
      case MovingDirections.Right:
        return styles.movingRight;
      case MovingDirections.DownRight:
        return styles.movingDownRight;
      case MovingDirections.DownLeft:
        return styles.movingDownLeft;
      case MovingDirections.Left:
        return styles.movingLeft;
      case MovingDirections.UpLeft:
        return styles.movingUpLeft;
      default:
        return undefined;
    }
  };

  const cssClass = clsx(
    styles.circle,
    !isChecked && type === CircleTypeEnum.Black && styles.circleBlack,
    !isChecked && type === CircleTypeEnum.White && styles.circleWhite,
    isChecked && styles.circleChecked,
    isMoving && getMovingClassName(),
    isError && isChecked && styles.circleError
  );

  return (
    <div
      className={cssClass}
      onAnimationEnd={isMoving ? clearIsMoving : clearError}
      onClick={currentTeam === type ? updateIsChecked : undefined}
    />
  );
};

export default Circle;
