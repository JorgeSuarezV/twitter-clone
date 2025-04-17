import {ReactionRepository} from "@domains/reaction/repository/reaction.repository";
import {PrismaClient, ReactionType} from "@prisma/client";
import {ReactionCountDTO, ReactionDTO} from "@domains/reaction/dto";

export class ReactionRepositoryImpl implements ReactionRepository {
    constructor(private readonly db: PrismaClient) {
    }


    async reactToPost(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO> {
        const result = await this.db.reaction.create({
            data: {
                userId: user_id,
                postId: post_id,
                type: reaction
            }
        });
        return new ReactionDTO(result);
    }

    async getReactionByUserAndPostId(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO | null> {
        const result = await this.db.reaction.findFirst({
            where: {
                userId: user_id,
                postId: post_id,
                type: reaction
            }
        });
        return result ? new ReactionDTO(result) : null;
    }

    async deleteReaction(reaction_id: string): Promise<void> {
        await this.db.reaction.delete({
            where: {
                id: reaction_id
            }
        });
    }

    async getReactions(user_id: string, query_user_id: string, reaction: ReactionType): Promise<ReactionDTO[]> {
        const result = await this.db.reaction.findMany({
            where: {
                type: reaction,
                post: {
                    OR: []
                }
            },
            // include: {
            //     post: {
            //         include: {
            //             author: true
            //         }
            //     }
            // }
        });
        return result.map((reaction) => new ReactionDTO(reaction));
    }

    async getReactionsByPostAndType(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionCountDTO> {
        let result = await Promise.all([this.db.reaction.count({
            where: {
                postId: post_id,
                type: reaction,
                post: {
                    OR: [
                        {
                            authorId: user_id
                        },
                        {
                            author: {
                                followers: {
                                    some: {
                                        followerId: user_id
                                    }
                                }
                            }
                        },
                        {
                            author: {
                                privacy: "PUBLIC"
                            }
                        }
                    ]
                },
            }
        }), this.db.reaction.findFirst({
            where: {
                postId: post_id,
                userId: user_id,
                type: reaction
            }
        })])
        const [count, userReaction] = result;
        return new ReactionCountDTO({count: count, isReacted: userReaction !== null});
    }
}