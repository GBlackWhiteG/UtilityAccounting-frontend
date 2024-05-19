export async function removeBuilding(id: number): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers: headers
    };

    const response = await fetch(`https://localhost:7004/api/building/delete?id=${id}`, options); 
    
    return response;
}