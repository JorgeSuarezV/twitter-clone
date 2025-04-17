import {fetch} from "./FetchRequests";

export function signup(name: string, username: string, email: string, password: string) {
    return fetch({
        url: "/api/auth/signup",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            name: name,
            username: username,
            email: email,
            password: password,
        }
    })
}

export function login(body: object) {
    return fetch({
        url: "/api/auth/login",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body
    })
}