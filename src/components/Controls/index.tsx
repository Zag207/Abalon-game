import clsx from 'clsx';

import { createMove } from '@/game/moving';
import { useGameStore } from '@/store/store';

import ButtonArrow from '../ButtonArrow';
import styles from './styles.module.scss';

const Controls = () => {
  const circles = useGameStore((store) => store.circles);
  const team = useGameStore((store) => store.team);
  const changeTeam = useGameStore((store) => store.changeTeam);
  const setCircles = useGameStore((store) => store.setCircles);
  const setIsErrorMove = useGameStore((store) => store.setIsErrorMove);
  const increaseScore = useGameStore((store) => store.increaseScore);
  const setMoving = useGameStore((store) => store.setMoving);

  const createMovingFunctionCallback = (movingPosition: number) => createMove({
    circles,
    currentTeam: team,
    changeTeam,
    setCircles,
    setIsErrorMove,
    increaseScore,
    setMoving,
    movingPosition
  });

  const positions = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <div className={styles.controls}>
      {positions.map((position) => (
        <div key={position} className={clsx([styles.el, styles[`abs${position}`]])}>
          <ButtonArrow
            moveCallback={createMovingFunctionCallback(position)}
            position={position}
          />
        </div>
      ))}
    </div>
  );
};

export default Controls;
