import { ConflictException, isValidUUID, NotFoundException } from "@utils";
import { FollowService } from "@domains/follow/service";
import { FollowRepository } from "@domains/follow/repository";
import {UserRepository} from "@domains/user/repository";
import { FollowDto } from "@domains/follow/dto";



export class FollowServiceImpl implements FollowService {
    constructor(private followRepository: FollowRepository, private userRepository: UserRepository) {
    }

    async followUser(follower_id: string, followed_id: string): Promise<FollowDto> {
        if (follower_id === followed_id) throw new ConflictException('You cannot follow yourself')
        if (isValidUUID(followed_id)) throw new NotFoundException('User')

        const followRelation = await this.followRepository.findFollowRelation(follower_id, followed_id);
        if (followRelation) throw new ConflictException('Follow relation already exists')

        const followedUser = await this.userRepository.getById(followed_id);
        if (!followedUser) throw new NotFoundException('User')

        return await this.followRepository.followUser(follower_id, followed_id);
    }

    async unfollowUser(follower_id: string, followed_id: string): Promise<void> {
        if (isValidUUID(followed_id)) throw new ConflictException('Invalid followed id')

        const followRelation = await this.followRepository.findFollowRelation(follower_id, followed_id);
        if (!followRelation) throw new NotFoundException('Follow relation')

        await this.followRepository.unfollowUser(followRelation.id);
    }

    async getFollowRelation(user_id: string, followed_user_id: string): Promise<FollowDto | null> {
        if (isValidUUID(user_id)) throw new ConflictException('Invalid user id')

        const followRelation = await this.followRepository.getFollowRelation(user_id, followed_user_id);
        if (!followRelation) throw new NotFoundException('Follow relation')

        return followRelation;
    }
}

