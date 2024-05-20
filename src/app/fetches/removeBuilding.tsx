export async function removeBuilding(id: number): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers: headers
    };

    const response = await fetch(`https://a26974-8b7b.k.d-f.pw/api/building/delete?id=${id}`, options); 
    
    return response;
}