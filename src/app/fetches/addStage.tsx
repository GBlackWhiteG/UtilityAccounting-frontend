import { addState } from '@/app/interfaces/IStage';

export async function addStage (buidlingId: number, tariffs: string, payments: string): Promise<Response> {
    const data: addState = {
        buildingId: buidlingId,
        tariffs: tariffs.split(' ').map(Number),
        payments: payments.split(' ').map(Number)
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    };

    const response = await fetch(`https://localhost:7004/api/stage/add`, options);

    return response;
} 