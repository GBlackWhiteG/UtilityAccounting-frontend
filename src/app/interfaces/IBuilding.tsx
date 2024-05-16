import { stageState } from "./IStage";

export interface buildingState {
    stages: stageState[]
}

export interface building {
    id: number,
    coordinates: number[],
    address: string
}

export interface addBuidling {
    coordinates: number[],
    address: string
}
