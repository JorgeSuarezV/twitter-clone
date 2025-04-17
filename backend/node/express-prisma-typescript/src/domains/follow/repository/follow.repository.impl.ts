import {PrismaClient} from "@prisma/client";
import {FollowRepository} from "@domains/follow/repository/follow.repository";
import {FollowDto} from "@domains/follow/dto";


export class FollowRepositoryImpl implements FollowRepository {
    constructor(private db: PrismaClient) {
    }

    async getFollowRelation(user_id: string, followed_user_id: string): Promise<FollowDto | null> {
        const relation = await this.db.follow.findFirst({
            where: {
                followerId: user_id,
                followedId: followed_user_id
            }
        });
        return relation ? new FollowDto(relation) : null;
    }

    async followUser(follower_id: string, followed_id: string): Promise<FollowDto> {
        const followRelation = await this.db.follow.create({
            data: {
                followerId: follower_id,
                followedId: followed_id
            }
        });
        return new FollowDto(followRelation);
    }

    async findFollowRelation(follower_id: string, followed_id: string): Promise<FollowDto | null> {
        const followRelation = await this.db.follow.findFirst({
            where: {
                followerId: follower_id,
                followedId: followed_id
            }
        });
        if (!followRelation) return null;
        return new FollowDto(followRelation);
    }

    async unfollowUser(follow_id: string): Promise<void> {
        await this.db.follow.delete({
            where: {
                id: follow_id
            }
        });
    }

    async findAllFollowRelations(userId: string, followed: string[]): Promise<FollowDto[]> {
        const followRelations = await this.db.follow.findMany({
            where: {
                followerId: userId,
                followedId: {
                    in: followed
                }
            }
        });
        return followRelations.map((followRelation) => new FollowDto(followRelation));
    }
}