import { create }  from "zustand"
import { CircleTypeEnum, ICircleCoordinates, ICircleType } from "../types/CircleTypes"
import MovingTypes from "../types/MovingTypes"

const prepareCirclesLine = (line: number, startDiagonal: number, circlesCount: number, type: CircleTypeEnum): ICircleType[] => {
    const arr: ICircleType[] = []

    for (let diagonal = startDiagonal; diagonal < startDiagonal + circlesCount; diagonal++) 
    {
        arr.push({
            id: Symbol(),
            type: type,
            coords: {
                line: line,
                diagonal: diagonal
            },
            isChecked: false,
            isMoving: false
        })
    }

    return arr
}
const prepareCircles = (): ICircleType[] => {
    const arr: ICircleType[] = []

    let circleType = CircleTypeEnum.White

    arr.push(...prepareCirclesLine(1, 5, 5, circleType))
    arr.push(...prepareCirclesLine(2, 4, 6, circleType))
    arr.push(...prepareCirclesLine(3, 5, 3, circleType))

    circleType = CircleTypeEnum.Black

    arr.push(...prepareCirclesLine(7, 3, 3, circleType))
    arr.push(...prepareCirclesLine(8, 1, 6, circleType))
    arr.push(...prepareCirclesLine(9, 1, 5, circleType))

    return arr
}

interface IGameStore{
    circles: ICircleType[],
    moving: MovingTypes,
    scoreBlack: number,
    scoreWhite: number,

    deleteCircleById(id: Symbol): void,
    setCoordsById(id: Symbol, newCoords: ICircleCoordinates): void,
    setMovingCircleById(id: Symbol, movingValue: boolean): void,
    setChecked(id: Symbol, value: boolean): void,
    setMoving(value: MovingTypes): void,
    increaseScoreBlack(): void,
    increaseScoreWhite(): void,
}

export const useGameStore = create<IGameStore>((set, get) => ({
    circles: prepareCircles(),
    moving: MovingTypes.NoMove,
    scoreBlack: 0,
    scoreWhite: 0,

    deleteCircleById: (id: Symbol): void => {
        const circleIndex = get().circles.findIndex(v => v.id == id)

        if(circleIndex != -1){
            set({circles: [...get().circles.filter(circle => circle.id != id)]})
        }
    },
    setCoordsById: (id: Symbol, newCoords: ICircleCoordinates): void => {
        const circleIndex = get().circles.findIndex(v => v.id == id)

        if(circleIndex != -1){
            const circlesNew = get().circles

            circlesNew[circleIndex].coords = newCoords
            set({circles: [...circlesNew]})
        }
    },
    setMovingCircleById: (id: Symbol, value: boolean): void => {
        const circleIndex = get().circles.findIndex(v => v.id == id)

        if(circleIndex != -1){
            const circlesNew = get().circles

            circlesNew[circleIndex].isMoving = value
            set({circles: [...circlesNew]})
        }
    },
    setChecked: (id: Symbol, value: boolean): void => {
        const circleIndex = get().circles.findIndex(v => v.id == id)

        if(circleIndex != -1){
            const circlesNew = get().circles

            circlesNew[circleIndex].isChecked = value
            set({circles: [...circlesNew]})
        }
    },
    setMoving: (value: MovingTypes): void => set({moving: value}),
    increaseScoreBlack: (): void => set({scoreBlack: get().scoreBlack + 1}),
    increaseScoreWhite: (): void => set({scoreWhite: get().scoreWhite + 1}),
}))
