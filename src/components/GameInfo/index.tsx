import clsx from 'clsx';

import { useGameStore } from '@/store/store';
import { CircleTypeEnum } from '@/types/CircleTypes';

import styles from './styles.module.scss';

const GameInfo = () => {
  const scoreBlack = useGameStore((state) => state.scoreBlack);
  const scoreWhite = useGameStore((state) => state.scoreWhite);
  const team = useGameStore((state) => state.team);

  return (
    <div className={styles.gameInfo}>
      <div className={clsx([styles.gameInfoItem, styles.black], {
        [styles.selected]: team === CircleTypeEnum.Black
      })}
      >
        Black score: {scoreBlack}
      </div>
      <div className={clsx([styles.gameInfoItem, styles.white], {
        [styles.selected]: team === CircleTypeEnum.White
      })}
      >
        White score: {scoreWhite}
      </div>
    </div>
  );
};

export default GameInfo;
