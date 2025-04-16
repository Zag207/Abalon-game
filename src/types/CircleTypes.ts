export interface ICircleCoordinates{
    line: number,
    upDiagonal: number,
    downDiagonal: number
}

export enum CircleTypeEnum{
    Black,
    White
}

export interface ICircleType{
    id: number,
    type: CircleTypeEnum,
    coords: ICircleCoordinates,
    isChecked: boolean,
    isMoving: boolean
}