/* eslint-disable style/indent */
import clsx from 'clsx';

import { CircleTypeEnum } from '@/types/CircleTypes';

import styles from './styles.module.scss';

interface WinNotificationProps {
  winnerTeam: CircleTypeEnum
}

const WinNotification = ({ winnerTeam }: WinNotificationProps) =>
  (
    <div className={styles.winNotificationContainer}>
      <div className={styles.winNotificationContent}>
        Win <span className={clsx({
          [styles.black]: winnerTeam === CircleTypeEnum.Black,
          [styles.white]: winnerTeam === CircleTypeEnum.White
        })}
            >
          {winnerTeam === CircleTypeEnum.Black ? 'Black' : 'White'}
            </span>
      </div>
    </div>
  )
;

export default WinNotification;
