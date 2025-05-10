export interface CircleCoordinates{
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
    coords: CircleCoordinates,
    isChecked: boolean,
    isMoving: boolean
}