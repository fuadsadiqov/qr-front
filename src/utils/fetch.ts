export const fetchApi = (method: string, body: any) => {
    let options: any = {
        headers: {
            "Content-Type": "application/json",
        },
        method,
    }
    if(body){
        options['body'] = JSON.stringify(body)
    }
    return options;
}