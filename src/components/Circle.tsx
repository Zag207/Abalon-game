import React from "react"
import { CircleTypeEnum, ICircleType } from "../types/CircleTypes"
import classes from "../scss/Circle.module.scss"
import MovingTypes from "../types/MovingTypes"
import { useGameStore } from "../store/store"

interface CircleProps extends ICircleType{
    moving: MovingTypes,
}

//Не применяется класс movingRight при нажатии на кнопку, а сами анимации работают
const Circle:React.FC<CircleProps> = ({id, type, isChecked, moving, isMoving}) => {
    let cssClass = classes.circle

    const setIsChecked = useGameStore(state => state.setChecked)
    const setIsMoved = useGameStore(state => state.setMovingCircleById)

    const updateIsChecked = () => {
        setIsChecked(id, !isChecked)
    }
    const clearIsMoving = () => {
        setIsMoved(id, false)
        updateIsChecked()
    }

    if(!isChecked)
    {
        switch (type) 
        {
            case CircleTypeEnum.Black:
                cssClass += ' ' + classes.circleBlack
                break;
            case CircleTypeEnum.White:
                cssClass += ' ' + classes.circleWhite
                break;
        }
    }
    else
    {
        cssClass += ' ' + classes.circleChecked
    }

    if(isMoving)
    {
        console.log("В isMoving")
        cssClass += ' '

        switch (moving) {
            case MovingTypes.UpRight:
                cssClass += ' ' + classes.movingUpRight
                break;
            case MovingTypes.Right:
                cssClass += ' ' + classes.movingRight
                break;
            case MovingTypes.DownRight:
                cssClass += ' ' + classes.movingDownRight
                break;
            case MovingTypes.DownLeft:
                cssClass += ' ' + classes.movingDownLeft
                break;
            case MovingTypes.Left:
                cssClass += ' ' + classes.movingLeft
                break;
            case MovingTypes.UpLeft:
                cssClass += ' ' + classes.movingUpLeft
                break;
            default:
                break;
        }
    }

    return (
        <div className={cssClass} onClick={updateIsChecked} onAnimationEnd={clearIsMoving}>
        </div>
    )
};

export default Circle;
