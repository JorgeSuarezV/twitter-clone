import {authorizedRequest} from "./FetchRequests";

export function getPostsByAuthorId(authorId: string, limit: number, after?: string) {
    let query: any = {limit: limit}
    query = after ? {...query, after: after} : query


    return authorizedRequest({
        url: `/api/post/by_user/${authorId}`,
        method: "GET",
        query: query
    });
}

export function getFeed(limit: number, after?: string) {
    let query: any = {limit: limit}
    query = after ? {...query, after: after} : query


    return authorizedRequest({
        url: `/api/post/`,
        method: "GET",
        query: query
    });
}

export function getFollowedPosts(limit: number, after?: string) {
    let query: any = {limit: limit}
    query = after ? {...query, after: after} : query

    return authorizedRequest({
        url: `/api/post/followed`,
        method: "GET",
        query: query
    });
}

export function createPost(content: string, images: string[]) {
    return authorizedRequest({
        url: `/api/post/`,
        method: "POST",
        body: {content: content, images: images}
    });
}

export function getPostById(id: string) {
    return authorizedRequest({
        url: `/api/post/${id}`,
        method: "GET"
    });
}


export function deletePost(id: string) {
    return authorizedRequest({
        url: `/api/post/${id}`,
        method: "DELETE"
    });
}
