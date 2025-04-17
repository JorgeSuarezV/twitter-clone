import {ReactionRepository} from "@domains/reaction/repository";
import {ReactionDTO} from "@domains/reaction/dto";
import {ReactionType} from "@prisma/client";

export class MockFoundReactionRepository implements ReactionRepository {
    deleteReaction(reaction_id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getReactionByUserAndPostId(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO | null> {
        return new ReactionDTO({
            id: "1",
            postId: post_id,
            userId: user_id,
            type: "LIKE",
            createdAt: new Date()
            })
    }

    getReactions(user_id: string, query_user_id: string, reaction: ReactionType): Promise<ReactionDTO[]> {
        return Promise.resolve([]);
    }

    reactToPost(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO> {
        throw new Error("should not be called");
    }

}