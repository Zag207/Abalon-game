export interface ICircleCoordinates{
    line: number,
    diagonal: number,
}

export enum CircleTypeEnum{
    Black,
    White
}

export interface CircleType{
    id: Symbol,
    type: CircleTypeEnum,
    coords: ICircleCoordinates,
    isChecked: boolean,
    isMoving: boolean
}