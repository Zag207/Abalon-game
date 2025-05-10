import { CircleTypeEnum, CircleType } from "../types/CircleTypes"
import classes from "../scss/Circle.module.scss"
import {MovingDirections} from "../types/MovingTypes"
import { useGameStore } from "../store/store"

interface CircleProps extends CircleType{
    moving: MovingDirections,
}

//Не применяется класс movingRight при нажатии на кнопку, а сами анимации работают
const Circle = ({id, type, isChecked, moving, isMoving}: CircleProps) => {
    let cssClass = classes.circle

    const currentTeam = useGameStore(state => state.team)
    const isError = useGameStore(state => state.isErrorMove)

    const setIsChecked = useGameStore(state => state.setChecked)
    const setIsError = useGameStore(state => state.setIsErrorMove)
    const setIsMoved = useGameStore(state => state.setMovingCircleById)
    const canICheckCircle = useGameStore(state => state.canICheckCircles)

    const updateIsChecked = () => {
        const isToChecked = !isChecked

        if(isToChecked && canICheckCircle() || !isToChecked)
            setIsChecked(id, isToChecked)
    }
    const clearIsMoving = () => {
        setIsMoved(id, false)
        setIsChecked(id, false)
    }
    const clearError = () => {
        const indexError = cssClass.indexOf(` ${classes.circleError}`)

        if(indexError > -1)
        {
            const left = cssClass.slice(indexError, indexError + ` ${classes.circleError}`.length)
            const right = cssClass.slice(indexError + ` ${classes.circleError}`.length)
            
            cssClass = left + right
            setIsError(false)
        }
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
        cssClass += ' '

        switch (moving) {
            case MovingDirections.UpRight:
                cssClass += ' ' + classes.movingUpRight
                break;
            case MovingDirections.Right:
                cssClass += ' ' + classes.movingRight
                break;
            case MovingDirections.DownRight:
                cssClass += ' ' + classes.movingDownRight
                break;
            case MovingDirections.DownLeft:
                cssClass += ' ' + classes.movingDownLeft
                break;
            case MovingDirections.Left:
                cssClass += ' ' + classes.movingLeft
                break;
            case MovingDirections.UpLeft:
                cssClass += ' ' + classes.movingUpLeft
                break;
            default:
                break;
        }
    }

    if(isError && isChecked)
        cssClass += ' ' + classes.circleError

    return (
        <div className={cssClass} 
             onClick={currentTeam == type ? updateIsChecked : undefined} 
             onAnimationEnd={isMoving ? clearIsMoving : clearError} />
    )
};

export default Circle;
