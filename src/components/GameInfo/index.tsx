import { useGameStore } from '@/store/store';
import { CircleTypeEnum } from '@/types/CircleTypes';

import styles from './styles.module.scss';

const GameInfo = () => {
  const scoreBlack = useGameStore((state) => state.scoreBlack);
  const scoreWhite = useGameStore((state) => state.scoreWhite);
  const team = useGameStore((state) => state.team);

  return (
    <div className={styles.gameInfo}>
      <div className={`${styles.gameInfoItem} ${styles.black} ${team === CircleTypeEnum.Black ? styles.selected : ''}`}>
        Black score: {scoreBlack}
      </div>
      <div className={`${styles.gameInfoItem} ${styles.white} ${team === CircleTypeEnum.White ? styles.selected : ''}`}>
        White score: {scoreWhite}
      </div>
    </div>
  );
};

export default GameInfo;
