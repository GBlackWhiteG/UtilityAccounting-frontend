import { stageState } from "./IStage";

export interface buildingState {
    stages: stageState[]
}

export interface building {
    id: number,
    firstCoordinate: number,
    secondCoordinate: number,
    address: string
}

export interface addBuilding {
    firstCoordinates: number,
    secondCoordinates: number,
    address: string
}
