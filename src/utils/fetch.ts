export const fetchApi = (method: string, body: any) => {
    let options: any = {
        headers: {
            "Content-Type": "application/json",
        },
        method,
    }
    body ? options['body'] = JSON.stringify(body) : undefined;
    return options;
}