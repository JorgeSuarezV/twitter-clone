import { FollowDto } from "@domains/follow/dto";

export interface FollowService {
    followUser(follower_id: string, followed_id: string): Promise<FollowDto>;
    unfollowUser(follower_id: string, followed_id: string): Promise<void>
    getFollowRelation(user_id: string, followed_user_id: string): Promise<FollowDto | null>
}