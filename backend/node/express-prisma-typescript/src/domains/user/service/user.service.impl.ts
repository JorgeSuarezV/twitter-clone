import {NotFoundException} from "@utils/http.errors";
import {OffsetPagination} from "types";
import {UserDTO} from "../dto";
import {UserRepository} from "../repository";
import {UserService} from "./user.service";
import {UserPrivacy} from "@prisma/client";

export class UserServiceImpl implements UserService {
    constructor(private readonly repository: UserRepository) {
    }


    async searchUsers(search_string: string, limit: number): Promise<UserDTO[]> {
      return await this.repository.searchUsers(search_string, limit)
    }

    async getUser(userId: any): Promise<UserDTO> {
        const user = await this.repository.getById(userId);
        if (!user) throw new NotFoundException("user");
        return user;
    }

    async getUserRecommendations(userId: string, options: OffsetPagination): Promise<UserDTO[]> {
        // TODO: make this return only users followed by users the original user follows
        return await this.repository.getRecommendedUsersPaginated(userId, options);
    }

    deleteUser(userId: any): Promise<void> {
        return this.repository.delete(userId);
    }

    async updatePrivacy(userId: string, privacy: UserPrivacy): Promise<void> {
        await this.repository.updatePrivacy(userId, privacy);
    }

    async updateProfilePic(userId: string, preSignedURL: string): Promise<UserDTO> {
        return await this.repository.updateProfilePic(userId, preSignedURL);
    }
}
