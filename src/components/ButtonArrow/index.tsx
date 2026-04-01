import clsx from 'clsx';

import styles from './styles.module.scss';

interface ButtonArrowProps {
  position: number,
  moveCallback: () => void;
}

const ButtonArrow = ({ position, moveCallback }: ButtonArrowProps) => (
  <div
    className={clsx(styles.arrowContainer, position === 1 && styles.arrowContainer1)}
    onClick={moveCallback}
  >
    <svg className={styles[`rotate-${position}`]} viewBox='0 0 100 85'>
      <polygon points='58.263,0.056 100,41.85 58.263,83.641 30.662,83.641 62.438,51.866 0,51.866 0,31.611 62.213,31.611 30.605,0 58.263,0.056' />
    </svg>
  </div>
);

export default ButtonArrow;
