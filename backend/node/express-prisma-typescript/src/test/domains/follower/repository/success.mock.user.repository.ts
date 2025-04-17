import {UserRepository} from "../../../../domains/user/repository";
import {ExtendedUserDTO, UserDTO} from "../../../../domains/user/dto";
import {OffsetPagination} from "../../../../types";
import {SignupInputDTO} from "../../../../domains/auth/dto";
import {UserPrivacy} from "@prisma/client";

export class SuccessMockUserRepository implements UserRepository {
    searchUsers(search_string: string, limit: number): Promise<UserDTO[]> {
        throw new Error("Method not implemented.");
    }
    create(data: SignupInputDTO): Promise<UserDTO> {
        throw new Error("should not be called");
    }

    delete(userId: string): Promise<void> {
        throw new Error("should not be called");
    }

    getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null> {
        throw new Error("should not be called");
    }

    async getById(userId: string): Promise<UserDTO | null> {
        return Promise.resolve(createUserDTO({
            id: "1",
            name: "name",
            createdAt: new Date(40),
            privacy: "PUBLIC",
            profilePicture: "profilePicture"
        }as UserDTO));
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