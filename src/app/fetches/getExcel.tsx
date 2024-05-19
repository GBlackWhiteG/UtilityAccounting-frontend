export async function getExcel(id: number): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "application/xlsx");
    const options = {
        method: "GET",
        headers: headers,
        responseType: "blob"
    };

    const response = await fetch(`https://localhost:7004/getExcel?id=${id}`, options);

    return response;
}