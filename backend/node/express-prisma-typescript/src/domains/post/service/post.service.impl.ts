import {CreatePostInputDTO, PostDTO} from "../dto";
import {PostRepository} from "../repository";
import {PostService} from ".";
import {ForbiddenException, NotFoundException} from "@utils";
import {CursorPagination} from "@types";
import {FollowRepository} from "@domains/follow/repository";
import {putObjectUrl} from "@utils/s3.bucket";
import {generateImageNames} from "@domains/post/util";


export class PostServiceImpl implements PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly followRepository: FollowRepository
    ) {
    }

    getFollowedPosts(userId: string, options: CursorPagination): Promise<PostDTO[]> {
        return this.postRepository.getFollowedPosts(userId, options);
    }

    async createPost(userId: string, body: CreatePostInputDTO): Promise<{ urls: string[]; post: PostDTO }> {
        const post = await this.postRepository.create(userId, body);
        const urls = await this.generateUrls(body.images, post.id);
        return {post: post, urls: urls};
    }

    async deletePost(userId: string, postId: string): Promise<void> {
        const post = await this.postRepository.getById(postId);
        if (!post) throw new NotFoundException("post");
        if (post.author.id !== userId) throw new ForbiddenException();
        return this.postRepository.delete(postId);
    }

    async getPost(userId: string, postId: string): Promise<PostDTO> {
        const post = await this.postRepository.getByIdIfAvailable(userId, postId);
        if (!post) throw new NotFoundException("post");
        post.comments = await this.postRepository.getTop10Comments(postId);
        return post;
    }

    async getLatestPosts(userId: string, options: CursorPagination): Promise<PostDTO[]> {
        return await this.postRepository.getPublicAndPrivateButFollowedPosts(options, userId);
    }

    async getPostsByAuthor(userId: any, authorId: string, options: CursorPagination): Promise<PostDTO[]> {
        const posts = await this.postRepository.getByAuthorIdIfAuthorized(authorId, userId, options);


        if (posts.length === 0) {
            const isFollowing = await this.followRepository.findFollowRelation(userId, authorId);
            if (isFollowing) return [];
            throw new NotFoundException("Post");
        }

        return posts;
    }

    async createComment(user_id: string, post_id: string, content: string, images: string[]): Promise<PostDTO> {
        const post = await this.postRepository.getByIdIfAvailable(user_id, post_id);
        if (!post) throw new NotFoundException("post");
        const comment = await this.postRepository.createComment(user_id, post_id, content, images);
        if (!comment) throw new Error("Comment not created");
        return comment;
    }

    async getCommentsByUser(userId: string, query_user_id: string): Promise<PostDTO[]> {
        return this.postRepository.getCommentsByUser(userId, query_user_id);
    }


    private async generateUrls(images: string[], postId: string): Promise<string[]> {
        const imageNames = generateImageNames(images)
        return await Promise.all(imageNames.map(async (imageName) => {
            return await putObjectUrl(`post/${postId}/${imageName}`);
        }));
    }
}

