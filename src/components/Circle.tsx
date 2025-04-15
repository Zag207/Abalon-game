import React from "react"
import { CircleTypeEnum, ICircleType } from "../types/CircleTypes"
import classes from "./scss/Circle.module.scss"

interface CircleProps extends ICircleType{
    updateCheckedCallback(id: number, value: boolean): void
}

const Circle:React.FC<CircleProps> = ({id, type, isChecked, updateCheckedCallback, ...props}) => {
    let cssClass = classes.circle
    let cssClassTwo = ''
    
    if(!isChecked)
    {
        switch (type) 
        {
            case CircleTypeEnum.Black:
                cssClassTwo = classes.circleBlack
                break;
            case CircleTypeEnum.White:
                cssClassTwo = classes.circleWhite
                break;
        }
    }
    else
    {
        cssClassTwo = classes.circleChecked
    }

    cssClass += ' ' + cssClassTwo

    return (
        <div className={cssClass} onClick={() => updateCheckedCallback(id, !isChecked)}>
        
        </div>
    )
};

export default Circle;
