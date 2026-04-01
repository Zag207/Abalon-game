import { useEffect } from 'react';

import Board from './components/Board';
import Controls from './components/Controls';
import GameInfo from './components/GameInfo';
import MyModal from './components/UI/MyModal';
import WinNotification from './components/WinNotification';
import { isInBoard } from './game/geometry';
import classes from './scss/App.module.scss';
import { useGameStore } from './store/store';

const App = () => {
  const {
    circles,
    getWinnerTeam,
    isWin,
    setCircles
  } = useGameStore((store) => store);

  useEffect(() => {
    const filteredCircles = circles.filter((circle) => isInBoard(circle.coords));

    if (filteredCircles.length < circles.length)
      setCircles(filteredCircles);
  });

  return (
    <div className={classes.game}>
      <MyModal isVisible={isWin()}>
        <WinNotification winnerTeam={getWinnerTeam()} />
      </MyModal>
      <div className={classes.board}>
        <Board />
      </div>
      <div className={classes.controls}>
        <Controls />
      </div>
      <div className={classes['game-info']}>
        <GameInfo />
      </div>
    </div>
  );
};

export default App;
