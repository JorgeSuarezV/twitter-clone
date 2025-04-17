import {authorizedRequest} from "./FetchRequests";

export function followRequest(id: string) {
    return authorizedRequest({
        url: "/api/follower/follow/" + id,
        method: "POST",

    })
}

export function unfollowRequest(id: string) {
    return authorizedRequest({
        url: "/api/follower/unfollow/" + id,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
    })
}

export function getFollowRelationRequest(id: string) {
    return authorizedRequest({
        url: "/api/follower/follows/" + id,
        method: "GET",
    })
}