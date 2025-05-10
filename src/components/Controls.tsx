import ButtonArrow from "./ButtonArrow";
import classes from "../scss/Controls.module.scss"

interface ControlsProps{
    createMovingFunctionCallback(moveType: number): (() => void),
}

const Controls = ({createMovingFunctionCallback}: ControlsProps) => {
  return (
    <div className={classes.controls}>
      {Array(6).fill(0).map((_, i) => i + 1).map(v => (
        <div key={v} className={`${classes.el} ${classes[`abs${v}`]}`}>
            <ButtonArrow position={v} moveCallback={createMovingFunctionCallback(v)} />
        </div>
      ))}
    </div>
  )
};

export default Controls;
