import { OffsetPagination } from '@types';
import { UserDTO } from '../dto';
import { UserPrivacy } from "@prisma/client";

export interface UserService {
  deleteUser(userId: any): Promise<void>;
  getUser(userId: any): Promise<UserDTO>;
  getUserRecommendations(userId: string, options: OffsetPagination): Promise<UserDTO[]>;
  updatePrivacy(userId: string, privacy: UserPrivacy): Promise<void>;
  updateProfilePic(userId: string, preSignedURL: string): Promise<UserDTO>;
  searchUsers(search_string: string, limit: number): Promise<UserDTO[]>;
}
