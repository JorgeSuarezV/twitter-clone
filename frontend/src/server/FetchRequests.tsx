export type FetchRequest = {
    url: string;
    method: HttpMethods;
    headers?: Record<string, string>;
    body?: object;
    query?: object;
}

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

export function fetch(request: FetchRequest) {
    if (!process.env.REACT_APP_SERVER_ADDRESS) throw new Error("REACT_APP_SERVER_ADDRESS not set");
    let {url, method, headers, body, query} = request;
    if (!request.headers) request.headers = {};
    request.headers["Content-Type"] = "application/json";

    let options: any = {
        method,
        headers,
        query
    }
    if (method !== "GET") {
        options.body = JSON.stringify(body);
    }

    const queryString = query ? "?" + new URLSearchParams({...query}).toString() : "";

    return window.fetch(process.env.REACT_APP_SERVER_ADDRESS + url + queryString, options)
        .then(response => response)
        .catch((error: any) => {
            return error;
        });
}


export function authorizedRequest(request: FetchRequest) {
    const token = localStorage.getItem("token")
    // if (!token) navigate("/login")
    if (!request.headers) request.headers = {};
    request.headers["Content-Type"] = "application/json";
    request.headers["Authorization"] = "Bearer " + token
    return fetch(request)
}