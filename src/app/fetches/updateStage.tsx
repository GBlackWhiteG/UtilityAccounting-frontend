import { stageState } from "../interfaces/IStage";

export async function updateStage(id: number, buildingId: number, tariffs: string, payments: string): Promise<Response> {
    const data: stageState = {
        id: id,
        buildingId: buildingId,
        tariffs: tariffs.split(' ').map(Number),
        payments: payments.split(' ').map(Number)
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    };

    const response = await fetch(`https://a26974-8b7b.k.d-f.pw/api/stage/update`, options);

    return response;
}