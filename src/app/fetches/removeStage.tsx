export async function removeStage(id: number | undefined): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers: headers
    };

    const response = await fetch(`https://localhost:7004/api/stage/delete?id=${id}`, options);
    
    return response;
}