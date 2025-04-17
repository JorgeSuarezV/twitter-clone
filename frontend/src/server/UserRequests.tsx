import {authorizedRequest} from "./FetchRequests";

export function fetchRecommendations(limit: number, skip: number) {
    return authorizedRequest({
        url: "/api/user/",
        method: "GET",
        query: {
            limit: limit,
            skip: skip
        },
    })
}

export function searchRequest(searchedValue: string) {
    return authorizedRequest({
        url: `/api/user/search/${searchedValue}`,
        method: "GET",
        query: {
            limit: 6
        }
    })
}

export function getMe() {
    return authorizedRequest({
        url: "/api/user/me",
        method: "GET",
    })
}

export function getProfile(id: string) {
    return authorizedRequest({
        url: `/api/user/${id}`,
        method: "GET",
    })
}

export function deleteUser() {
    return authorizedRequest({
        url: `/api/user/`,
        method: "DELETE",
    })
}