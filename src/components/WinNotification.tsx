import classes from '../scss/WinNotification.module.scss';
import { CircleTypeEnum } from '../types/CircleTypes';

interface WinNotificationProps {
  winnerTeam: CircleTypeEnum
}

const WinNotification = ({ winnerTeam }: WinNotificationProps) => {
  let teamClass: string = '';

  switch (winnerTeam) {
    case CircleTypeEnum.Black:
      teamClass = classes.black;
      break;
    case CircleTypeEnum.White:
      teamClass = classes.white;
      break;
  }

  return (
    <div className={classes.winNotificationContainer}>
      <div className={classes.winNotificationContent}>
        Win <span className={teamClass}> {winnerTeam === CircleTypeEnum.Black ? 'Black' : 'White'}</span>
      </div>
    </div>
  );
};

export default WinNotification;
