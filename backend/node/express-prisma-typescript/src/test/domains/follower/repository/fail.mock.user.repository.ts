import {SuccessMockUserRepository} from "@test/domains/follower/repository/success.mock.user.repository";
import {UserRepository} from "@domains/user/repository";
import {SignupInputDTO} from "@domains/auth/dto";
import {ExtendedUserDTO, UserDTO} from "@domains/user/dto";
import {OffsetPagination} from "@types";
import {UserPrivacy} from "@prisma/client";

export class FailMockUserRepository implements UserRepository {
    create(data: SignupInputDTO): Promise<UserDTO> {
        throw new Error("should not be called");
    }

    delete(userId: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null> {
        throw new Error("should not be called");
    }

    async getById(userId: string): Promise<UserDTO | null> {
        return null
    }

    getRecommendedUsersPaginated(options: OffsetPagination): Promise<UserDTO[]> {
        return Promise.resolve([]);
    }

    updatePrivacy(userId: string, privacy: UserPrivacy): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateProfilePic(userId: string, preSignedURL: string): Promise<UserDTO> {
        throw new Error("should not be called");
    }

}