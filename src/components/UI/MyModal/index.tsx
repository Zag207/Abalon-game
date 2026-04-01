import type { ReactNode } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

interface MyModalProps {
  children: ReactNode,
  isVisible: boolean
}

const MyModal = ({ children, isVisible }: MyModalProps) => (
  <div
    className={clsx({
      [styles.myModal]: true,
      [styles.myModalActive]: isVisible
    })}
  >
    <div className={styles.myModalContent}>
      {children}
    </div>
  </div>
);

export default MyModal;
