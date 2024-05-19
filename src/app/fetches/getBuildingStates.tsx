import { stageState } from "../interfaces/IStage";

export async function getStages(Id: number): Promise<stageState[] | undefined> {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
        method: "GET",
        headers: headers
    };

    const response = await fetch(`https://localhost:7004/api/building/stages?id=${Id}`, options);
    if (response.ok) {
        return await response.json();
    }
    return undefined;
}