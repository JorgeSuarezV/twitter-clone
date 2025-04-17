import {FollowRepository} from "../../../../domains/follow/repository";
import {FollowDto} from "../../../../domains/follow/dto";

export class FindRelationMockFollowRepository implements FollowRepository {
    findAllFollowRelations(userId: string, followedIds: string[]): Promise<FollowDto[]> {
        throw Error("should not be called")
    }

    async findFollowRelation(follower_id: string, followed_id: string): Promise<FollowDto | null> {
        return new FollowDto({ // ids are uuids
            id: "49a915e0-f357-11ed-a05b-0242ac120003",
            followerId: "49a915e0-f357-11ed-a05b-0242ac120003",
            followedId: "49a915e0-f357-11ed-a05b-0242ac120004",
            createdAt: new Date(40)
        })
    }

    async followUser(follower_id: string, followed_id: string): Promise<FollowDto> {
        throw Error("should not be called")
    }

    async unfollowUser(follow_id: string): Promise<void> {
        return
    }

}