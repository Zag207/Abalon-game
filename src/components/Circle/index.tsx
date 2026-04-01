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
  let cssClass = styles.circle;

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
    const indexError = cssClass.indexOf(` ${styles.circleError}`);

    if (indexError > -1)
    {
      const left = cssClass.slice(indexError, indexError + ` ${styles.circleError}`.length);
      const right = cssClass.slice(indexError + ` ${styles.circleError}`.length);

      cssClass = left + right;
      setIsError(false);
    }
  };

  if (!isChecked)
  {
    switch (type)
    {
      case CircleTypeEnum.Black:
        cssClass += ` ${styles.circleBlack}`;
        break;
      case CircleTypeEnum.White:
        cssClass += ` ${styles.circleWhite}`;
        break;
    }
  }
  else
  {
    cssClass += ` ${styles.circleChecked}`;
  }

  if (isMoving)
  {
    cssClass += ' ';

    switch (moving) {
      case MovingDirections.UpRight:
        cssClass += ` ${styles.movingUpRight}`;
        break;
      case MovingDirections.Right:
        cssClass += ` ${styles.movingRight}`;
        break;
      case MovingDirections.DownRight:
        cssClass += ` ${styles.movingDownRight}`;
        break;
      case MovingDirections.DownLeft:
        cssClass += ` ${styles.movingDownLeft}`;
        break;
      case MovingDirections.Left:
        cssClass += ` ${styles.movingLeft}`;
        break;
      case MovingDirections.UpLeft:
        cssClass += ` ${styles.movingUpLeft}`;
        break;
      default:
        break;
    }
  }

  if (isError && isChecked)
    cssClass += ` ${styles.circleError}`;

  return (
    <div
      className={cssClass}
      onAnimationEnd={isMoving ? clearIsMoving : clearError}
      onClick={currentTeam === type ? updateIsChecked : undefined}
    />
  );
};

export default Circle;
