import ButtonArrow from '../ButtonArrow';
import styles from './styles.module.scss';

interface ControlsProps {
  createMovingFunctionCallback: (moveType: number) => () => void,
}

const Controls = ({ createMovingFunctionCallback }: ControlsProps) => (
  <div className={styles.controls}>
    {Array.from({ length: 6 }).fill(0).map((_, i) => i + 1).map((v) => (
      <div key={v} className={`${styles.el} ${styles[`abs${v}`]}`}>
        <ButtonArrow moveCallback={createMovingFunctionCallback(v)} position={v} />
      </div>
    ))}
  </div>
);

export default Controls;
