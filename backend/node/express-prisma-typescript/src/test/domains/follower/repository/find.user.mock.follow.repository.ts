import {UserRepository} from "@domains/user/repository";
import {FollowRepository} from "@domains/follow/repository";
import {FollowDto} from "@domains/follow/dto";

export class FindUserMockFollowRepository implements FollowRepository {
    findAllFollowRelations(userId: string, followedIds: string[]): Promise<FollowDto[]> {
        return Promise.resolve([]);
    }

    async findFollowRelation(follower_id: string, followed_id: string): Promise<FollowDto | null> {
        return null
    }

    followUser(follower_id: string, followed_id: string): Promise<FollowDto> {
        return Promise.resolve(new FollowDto({
            id: "49a915e0-f357-11ed-a05b-0242ac120006",
            followerId: follower_id,
            followedId: followed_id,
            createdAt: new Date()
        }))
    }

    unfollowUser(follow_id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}