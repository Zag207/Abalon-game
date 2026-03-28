export interface CircleCoordinates {
  diagonal: number,
  line: number,
}

export enum CircleTypeEnum {
  Black,
  White
}

export interface CircleType {
  coords: CircleCoordinates,
  id: symbol,
  isChecked: boolean,
  isMoving: boolean
  type: CircleTypeEnum,
}
