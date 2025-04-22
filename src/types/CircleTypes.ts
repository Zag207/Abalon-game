export interface ICircleCoordinates{
    line: number,
    diagonal: number,
}

export enum CircleTypeEnum{
    Black,
    White
}

export interface ICircleType{
    id: Symbol,
    type: CircleTypeEnum,
    coords: ICircleCoordinates,
    isChecked: boolean,
    isMoving: boolean
}