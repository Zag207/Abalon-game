import classes from "../scss/HexagonLine.module.scss"
import Hexagon from "./Hexagon"
import { MovingDirections } from "../types/MovingTypes"
import { CircleType } from "../types/CircleTypes"

interface HexagonLineProps{
    startDiagonal: number,
    hexNumber: number,
    moving: MovingDirections,
    circles: CircleType[],
}

const HexagonLine = ({circles, moving, startDiagonal, hexNumber}: HexagonLineProps) => {
    const hexagonsI = [...Array(hexNumber)].map((_, i) => i + startDiagonal)
    const circlesSortedExtended = hexagonsI.map(v => {
        return circles.find(el => el.coords.diagonal == v)
    })

    return (
        <div className={classes.hexagonLine}>
            {circlesSortedExtended.map((circle, i) => (
                <Hexagon key={i} circle={circle} moving={moving} />
            ))}
        </div>
    )
};

export default HexagonLine;
