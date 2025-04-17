import { SignupInputDTO } from '@domains/auth/dto';
import { OffsetPagination } from '@types';
import { ExtendedUserDTO, UserDTO } from '../dto';
import { UserPrivacy } from "@prisma/client";

export interface UserRepository {
  searchUsers(search_string: string, limit: number): Promise<UserDTO[]>;
  create(data: SignupInputDTO): Promise<UserDTO>;
  delete(userId: string): Promise<void>;
  getRecommendedUsersPaginated(userId: string, options: OffsetPagination): Promise<UserDTO[]>;
  getById(userId: string): Promise<UserDTO | null>;
  getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null>;
  updatePrivacy(userId: string, privacy: UserPrivacy): Promise<void>;
  updateProfilePic(userId: string, preSignedURL: string): Promise<UserDTO>;
}
