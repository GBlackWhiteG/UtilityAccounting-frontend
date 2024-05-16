export interface stageState {
    id: number,
    buildingId: number,
    tariffs: number[],
    payments: number[]
}

export interface addState {
    buildingId: number,
    tariffs: number[],
    payments: number[]
}