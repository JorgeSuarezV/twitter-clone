import { CursorPagination } from '@types';
import { CreatePostInputDTO, PostDTO } from '../dto';

export interface PostRepository {
  create(userId: string, data: CreatePostInputDTO): Promise<PostDTO>;
  getPublicAndPrivateButFollowedPosts(options: CursorPagination, userId: string): Promise<PostDTO[]>;
  delete(postId: string): Promise<void>;
  getById(postId: string): Promise<PostDTO | null>;
  getByAuthorIdIfAuthorized(authorId: string, userId: string, options: CursorPagination): Promise<PostDTO[]>;
  getByIdIfAvailable(user_id: string, post_id: string): Promise<PostDTO | null>
  createComment(user_id: string, post_id: string, content: string, images: string[]): Promise<PostDTO | null>;
  getTop10Comments(postId: string): Promise<PostDTO[]>;
  getCommentsByUser(userId: string, query_user_id: string): Promise<PostDTO[]>;
  getFollowedPosts(userId: string, options: CursorPagination): Promise<PostDTO[]>;
}
