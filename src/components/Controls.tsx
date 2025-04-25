import React from "react"
import ButtonArrow from "./ButtonArrow";
import classes from "../scss/Controls.module.scss"

interface ControlsProps{
    buttonCount: number
}

const Controls:React.FC<ControlsProps> = ({buttonCount}) => {
  return (
    <div className={classes.controls}>
      {Array(buttonCount).fill(0).map((_, i) => i + 1).map(v => (
        <ButtonArrow key={v} position={v} moveCallback={() => {}} />
      ))}
    </div>
  )
};

export default Controls;
