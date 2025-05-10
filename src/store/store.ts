import { create }  from "zustand"
import { CircleTypeEnum, CircleType } from "../types/CircleTypes"
import {MovingTypes} from "../types/MovingTypes"

const prepareCirclesLine = (line: number, startDiagonal: number, circlesCount: number, type: CircleTypeEnum): CircleType[] => {
    const arr: CircleType[] = []

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
const prepareCircles = (): CircleType[] => {
    const arr: CircleType[] = []

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
    circles: CircleType[],
    moving: MovingTypes,
    scoreBlack: number,
    scoreWhite: number,
    team: CircleTypeEnum,
    isErrorMove: boolean,

    isWin(): boolean,
    setCircles(circles: CircleType[]): void,
    setMovingCircleById(id: Symbol, movingValue: boolean): void,
    setChecked(id: Symbol, value: boolean): void,
    setMoving(value: MovingTypes): void,
    increaseScore(team: CircleTypeEnum): void,
    getChechedCount(): number,
    canICheckCircles(): boolean,
    changeTeam(): void,
    clearIsChecked(): void,
    setIsErrorMove(value: boolean): void,
    getWinnerTeam(): CircleTypeEnum,
}

export const useGameStore = create<IGameStore>((set, get) => ({
    circles: prepareCircles(),
    moving: MovingTypes.NoMove,
    scoreBlack: 0,
    scoreWhite: 0,
    team: CircleTypeEnum.White,
    isErrorMove: false,

    getWinnerTeam: (): CircleTypeEnum => {
        if (get().scoreBlack >= 6) 
        {
            return CircleTypeEnum.Black
        }
        else
        {
            return CircleTypeEnum.White
        }
    },
    isWin: (): boolean => get().scoreBlack >= 6 || get().scoreWhite >= 6,
    setCircles: (circlesNew: CircleType[]): void => set({circles: [...circlesNew]}),
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
    setMoving: (value: MovingTypes): void => set(state => ({...state, moving: value})),
    increaseScore: (team: CircleTypeEnum): void => {
        switch (team) {
            case CircleTypeEnum.Black:
                set({scoreBlack: get().scoreBlack + 1})
                break
            case CircleTypeEnum.White:
                set({scoreWhite: get().scoreWhite + 1})
                break
        }
    },
    getChechedCount: (): number => get().circles.filter(circle => circle.isChecked).length,
    canICheckCircles: (): boolean => get().circles.filter(circle => circle.isChecked).length < 3,
    changeTeam: (): void => {
        const currentTeam = get().team

        if (currentTeam == CircleTypeEnum.White) {
            set({team: CircleTypeEnum.Black})
        }
        else{
            set({team: CircleTypeEnum.White})
        }
    },
    clearIsChecked: (): void => {
        const newCircles = get().circles.map(circle => {
            circle.isChecked = false

            return circle
        })

        set({circles: [...newCircles]})
    },
    setIsErrorMove: (value: boolean): void => set({isErrorMove: value}),
}))
