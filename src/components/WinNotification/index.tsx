import { CircleTypeEnum } from '@/types/CircleTypes';

import styles from './styles.module.scss';

interface WinNotificationProps {
  winnerTeam: CircleTypeEnum
}

const WinNotification = ({ winnerTeam }: WinNotificationProps) => {
  let teamClass: string = '';

  switch (winnerTeam) {
    case CircleTypeEnum.Black:
      teamClass = styles.black;
      break;
    case CircleTypeEnum.White:
      teamClass = styles.white;
      break;
  }

  return (
    <div className={styles.winNotificationContainer}>
      <div className={styles.winNotificationContent}>
        Win <span className={teamClass}> {winnerTeam === CircleTypeEnum.Black ? 'Black' : 'White'}</span>
      </div>
    </div>
  );
};

export default WinNotification;
