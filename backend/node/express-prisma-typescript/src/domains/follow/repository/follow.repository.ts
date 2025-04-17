import { FollowDto } from "@domains/follow/dto";

export interface FollowRepository {
  followUser(follower_id: string, followed_id: string): Promise<FollowDto>;
  unfollowUser(follow_id: string): Promise<void>;
  findFollowRelation(follower_id: string, followed_id: string): Promise<FollowDto | null>;
  findAllFollowRelations(userId: string, followedIds: string[]): Promise<FollowDto[]>;
  getFollowRelation(user_id: string, followed_user_id: string): Promise<FollowDto | null>
}