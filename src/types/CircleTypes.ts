export interface CircleCoordinates{
    line: number,
    upDiagonal: number,
    downDiagonal: number
}

export enum CircleTypeEnum{
    Black,
    White
}

export interface CircleType{
    id: number,
    type: CircleTypeEnum,
    coords: CircleCoordinates,
    isChecked: boolean,
}