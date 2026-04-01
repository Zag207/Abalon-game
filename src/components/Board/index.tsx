import { useGameStore } from '@/store/store';

import HexagonLine from '../HexagonLine';
import styles from './styles.module.scss';

const Board = () => {
  const circles = useGameStore((state) => state.circles);
  const moving = useGameStore((state) => state.moving);

  return (
    <div className={styles.board}>
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 1)}
        hexNumber={5}
        moving={moving}
        startDiagonal={5}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 2)}
        hexNumber={6}
        moving={moving}
        startDiagonal={4}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 3)}
        hexNumber={7}
        moving={moving}
        startDiagonal={3}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 4)}
        hexNumber={8}
        moving={moving}
        startDiagonal={2}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 5)}
        hexNumber={9}
        moving={moving}
        startDiagonal={1}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 6)}
        hexNumber={8}
        moving={moving}
        startDiagonal={1}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 7)}
        hexNumber={7}
        moving={moving}
        startDiagonal={1}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 8)}
        hexNumber={6}
        moving={moving}
        startDiagonal={1}
      />
      <HexagonLine
        circles={circles.filter((circle) => circle.coords.line === 9)}
        hexNumber={5}
        moving={moving}
        startDiagonal={1}
      />
    </div>
  );
};

export default Board;
