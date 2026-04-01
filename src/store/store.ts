import { create } from 'zustand';

import type { CircleType } from '../types/CircleTypes';

import { CircleTypeEnum } from '../types/CircleTypes';
import { MovingDirections } from '../types/MovingTypes';
import prepareCircles from './prepareCircles';

interface IGameStore {
  circles: CircleType[],
  isErrorMove: boolean,
  moving: MovingDirections,
  scoreBlack: number,
  scoreWhite: number,
  team: CircleTypeEnum,

  canICheckCircles: () => boolean,
  changeTeam: () => void,
  clearIsChecked: () => void,
  getChechedCount: () => number,
  getWinnerTeam: () => CircleTypeEnum,
  increaseScore: (team: CircleTypeEnum) => void,
  isWin: () => boolean,
  setChecked: (id: symbol, value: boolean) => void,
  setCircles: (circles: CircleType[]) => void,
  setIsErrorMove: (value: boolean) => void,
  setMoving: (value: MovingDirections) => void,
  setMovingCircleById: (id: symbol, movingValue: boolean) => void,
}

export const useGameStore = create<IGameStore>((set, get) => ({
  circles: prepareCircles(),
  moving: MovingDirections.NoMove,
  scoreBlack: 0,
  scoreWhite: 5,
  team: CircleTypeEnum.White,
  isErrorMove: false,

  getWinnerTeam: (): CircleTypeEnum => {
    if (get().scoreBlack >= 6)
    {
      return CircleTypeEnum.Black;
    }
    else
    {
      return CircleTypeEnum.White;
    }
  },
  isWin: (): boolean => get().scoreBlack >= 6 || get().scoreWhite >= 6,
  setCircles: (circlesNew: CircleType[]): void => set({ circles: [...circlesNew] }),
  setMovingCircleById: (id: symbol, value: boolean): void => {
    const circleIndex = get().circles.findIndex((v) => v.id === id);

    if (circleIndex !== -1) {
      const circlesNew = get().circles;

      circlesNew[circleIndex].isMoving = value;
      set({ circles: [...circlesNew] });
    }
  },
  setChecked: (id: symbol, value: boolean): void => {
    const circleIndex = get().circles.findIndex((v) => v.id === id);

    if (circleIndex !== -1) {
      const circlesNew = get().circles;

      circlesNew[circleIndex].isChecked = value;
      set({ circles: [...circlesNew] });
    }
  },
  setMoving: (value: MovingDirections): void => set((state) => ({ ...state, moving: value })),
  increaseScore: (team: CircleTypeEnum): void => {
    switch (team) {
      case CircleTypeEnum.Black:
        set({ scoreBlack: get().scoreBlack + 1 });
        break;
      case CircleTypeEnum.White:
        set({ scoreWhite: get().scoreWhite + 1 });
        break;
    }
  },
  getChechedCount: (): number => get().circles.filter((circle) => circle.isChecked).length,
  canICheckCircles: (): boolean => get().circles.filter((circle) => circle.isChecked).length < 3,
  changeTeam: (): void => {
    const currentTeam = get().team;

    if (currentTeam === CircleTypeEnum.White) {
      set({ team: CircleTypeEnum.Black });
    }
    else {
      set({ team: CircleTypeEnum.White });
    }
  },
  clearIsChecked: (): void => {
    const newCircles = get().circles.map((circle) => {
      circle.isChecked = false;

      return circle;
    });

    set({ circles: [...newCircles] });
  },
  setIsErrorMove: (value: boolean): void => set({ isErrorMove: value })
}));
