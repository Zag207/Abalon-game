import { ICircleType } from "../types/CircleTypes"
import { MovingTypes } from "../types/MovingTypes"
import Circle from "./Circle"
import classes from "../scss/Hexagon.module.scss"

interface HexagonProps{
    circle?: ICircleType,
    moving: MovingTypes,
}

const Hexagon = ({circle, moving}: HexagonProps) => {
  return (
    <div className={classes.hexagonContainer}>
      <svg className={classes.hexagonSvg} viewBox="0 0 86.6 100">
        <polygon points="43.3 0, 86.6 25, 86.6 75, 43.3 100, 0 75, 0 25" />
      </svg>
      {circle != undefined && <Circle id={circle.id} 
                                      type={circle.type} 
                                      coords={circle.coords} 
                                      isChecked={circle.isChecked} 
                                      isMoving={circle.isMoving} 
                                      moving={moving} />
      }
    </div>
  )
}

export default Hexagon;
