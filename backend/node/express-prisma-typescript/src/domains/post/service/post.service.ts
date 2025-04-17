import { CreatePostInputDTO, PostDTO } from '../dto';
import { CursorPagination } from "@types";

export interface PostService {
  createPost(userId: string, body: CreatePostInputDTO): Promise<{ urls: string[]; post: PostDTO }>;
  deletePost(userId: string, postId: string): Promise<void>;
  getPost(userId: string, postId: string): Promise<PostDTO>;
  getLatestPosts(userId: string, options: { limit?: number; before?: string; after?: string }): Promise<PostDTO[]>;
  getPostsByAuthor(userId: any, authorId: string, options:CursorPagination): Promise<PostDTO[]>;
  createComment(user_id: string, post_id: string, content: string, images: string[]): Promise<PostDTO>
  getCommentsByUser(userId: string, query_user_id: string): Promise<PostDTO[]>;
  getFollowedPosts(userId: string, options: CursorPagination): Promise<PostDTO[]>;
}
