import type { CircleType } from '../../types/CircleTypes';
import type { MovingDirections } from '../../types/MovingTypes';

import Hexagon from '../Hexagon';
import styles from './styles.module.scss';

interface HexagonLineProps {
  circles: CircleType[],
  hexNumber: number,
  moving: MovingDirections,
  startDiagonal: number,
}

const HexagonLine = ({ circles, moving, startDiagonal, hexNumber }: HexagonLineProps) => {
  const hexagonsI = Array.from(Array.from({ length: hexNumber }), (_, i) => i + startDiagonal);
  const circlesSortedExtended = hexagonsI.map(
    (v) => circles.find((el) => el.coords.diagonal === v)
  );

  return (
    <div className={styles.hexagonLine}>
      {circlesSortedExtended.map((circle, i) => (
        <Hexagon key={i} circle={circle} moving={moving} />
      ))}
    </div>
  );
};

export default HexagonLine;
