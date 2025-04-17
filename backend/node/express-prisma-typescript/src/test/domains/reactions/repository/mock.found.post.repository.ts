import {PostRepository} from "@domains/post/repository";
import {CreatePostInputDTO, PostDTO} from "@domains/post/dto";
import {CursorPagination} from "@types";

export class MockFoundPostRepository implements PostRepository {
    async create(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
        return new PostDTO({
            id: "1",
            authorId: userId,
            content: data.content,
            createdAt: new Date(),
            images: data.images!!
        })
    }

    createComment(user_id: string, post_id: string, content: string, images: string[]): Promise<PostDTO | null> {
        throw new Error("should not be called");
    }

    delete(postId: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getByAuthorIdIfAuthorized(authorId: string, userId: string, options: CursorPagination): Promise<PostDTO[]> {
        return Promise.resolve([]);
    }

    getById(postId: string): Promise<PostDTO | null> {
        throw new Error("should not be called");
    }

    async getByIdIfAvailable(user_id: string, post_id: string): Promise<PostDTO | null> {
        return new PostDTO({
            id: "1",
            authorId: user_id,
            content: "content",
            createdAt: new Date(),
            images: []
        })
    }

    getCommentsByUser(userId: string, query_user_id: string): Promise<PostDTO[]> {
        return Promise.resolve([]);
    }

    getPublicAndPrivateButFollowedPosts(options: CursorPagination, userId: string): Promise<PostDTO[]> {
        return Promise.resolve([]);
    }

    getTop10Comments(postId: string): Promise<PostDTO[]> {
        return Promise.resolve([]);
    }

}