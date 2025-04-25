import React from "react"
import { useGameStore } from "../store/store";
import HexagonLine from "./HexagonLine";

interface BoardProps{}

const Board:React.FC<BoardProps> = ({}) => {
    const circles = useGameStore(state => state.circles)
    const moving = useGameStore(state => state.moving)

    return (
        <div>
            <HexagonLine startDiagonal={5} hexNumber={5} moving={moving} circles={circles.filter(circle => circle.coords.line == 1)} />
            <HexagonLine startDiagonal={4} hexNumber={6} moving={moving} circles={circles.filter(circle => circle.coords.line == 2)} />
            <HexagonLine startDiagonal={3} hexNumber={7} moving={moving} circles={circles.filter(circle => circle.coords.line == 3)} />
            <HexagonLine startDiagonal={2} hexNumber={8} moving={moving} circles={circles.filter(circle => circle.coords.line == 4)} />
            <HexagonLine startDiagonal={1} hexNumber={9} moving={moving} circles={circles.filter(circle => circle.coords.line == 5)} />
            <HexagonLine startDiagonal={1} hexNumber={8} moving={moving} circles={circles.filter(circle => circle.coords.line == 6)} />
            <HexagonLine startDiagonal={1} hexNumber={7} moving={moving} circles={circles.filter(circle => circle.coords.line == 7)} />
            <HexagonLine startDiagonal={1} hexNumber={6} moving={moving} circles={circles.filter(circle => circle.coords.line == 8)} />
            <HexagonLine startDiagonal={1} hexNumber={5} moving={moving} circles={circles.filter(circle => circle.coords.line == 9)} />
        </div>
    )
};

export default Board;
