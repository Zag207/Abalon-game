import type { CircleType } from '@/types/CircleTypes';
import type { MovingDirections } from '@/types/MovingTypes';

import Circle from '../Circle';
import styles from './styles.module.scss';

interface HexagonProps {
  circle?: CircleType,
  moving: MovingDirections,
}

const Hexagon = ({ circle, moving }: HexagonProps) => (
  <div className={styles.hexagonContainer}>
    <svg className={styles.hexagonSvg} viewBox='0 0 86.6 100'>
      <polygon points='43.3 0, 86.6 25, 86.6 75, 43.3 100, 0 75, 0 25' />
    </svg>
    {circle !== undefined && (
      <Circle
        coords={circle.coords}
        id={circle.id}
        isChecked={circle.isChecked}
        isMoving={circle.isMoving}
        moving={moving}
        type={circle.type}
      />
    )
    }
  </div>
);

export default Hexagon;
