export async function getExcel(id: number): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "application/xlsx");
    const options = {
        method: "GET",
        headers: headers,
        responseType: "blob"
    };

    const response = await fetch(`https://a26974-8b7b.k.d-f.pw/getExcel?id=${id}`, options);

    return response;
}