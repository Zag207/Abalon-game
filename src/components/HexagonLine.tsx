import type { CircleType } from '../types/CircleTypes';
import type { MovingDirections } from '../types/MovingTypes';

import classes from '../scss/HexagonLine.module.scss';
import Hexagon from './Hexagon';

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
    <div className={classes.hexagonLine}>
      {circlesSortedExtended.map((circle, i) => (
        <Hexagon key={i} circle={circle} moving={moving} />
      ))}
    </div>
  );
};

export default HexagonLine;
