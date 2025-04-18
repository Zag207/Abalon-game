import React from "react"
import classes from "../scss/HexagonLine.module.scss"
import Hexagon from "./Hexagon"
import MovingTypes from "../types/MovingTypes"
import { ICircleType } from "../types/CircleTypes"

interface HexagonLineProps{
    startDiagonal: number,
    hexNumber: number,
    moving: MovingTypes,
    circles: ICircleType[],
    updateCheckedCallback(id: number, value: boolean): void
}

const HexagonLine:React.FC<HexagonLineProps> = ({circles, moving, startDiagonal, hexNumber, updateCheckedCallback, ...props}) => {
    const circlesSorted = circles.sort((a, b) => a.coords.diagonal - b.coords.diagonal)
    const hexagonsI = [...Array(hexNumber)].map((_, i) => i + startDiagonal)
    const circlesSortedExtended = hexagonsI.map(v => {
        return circlesSorted.find(el => el.coords.diagonal == v)
    })

    return (
        <div className={classes.hexagonLine}>
            {circlesSortedExtended.map((circle, i) => (
                <Hexagon key={i} circle={circle} moving={moving} updateCheckedCallback={updateCheckedCallback} />
            ))}
        </div>
    )
};

export default HexagonLine;
