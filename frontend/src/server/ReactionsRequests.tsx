import {authorizedRequest} from "./FetchRequests";

export type ReactionType = "LIKE" | "RETWEET";

export function queryReactionRequest(reactionType: ReactionType, postId: string) {
    return authorizedRequest({
        url: `/api/reaction/post/${reactionType}/${postId}`,
        method: "GET",
    })
}

export function postReactionRequest(reactionType: ReactionType, postId: string, action: "POST" | "DELETE") {
    return authorizedRequest({
        url: `/api/reaction/${postId}`,
        method: action,
        body: {reaction: reactionType}
    })
}