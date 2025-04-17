import {PrismaClient, UserPrivacy} from "@prisma/client";

import {CursorPagination} from "@types";

import {PostRepository} from ".";
import {createPostDTO, CreatePostInputDTO, PostDTO} from "../dto";
import {generateImageNames} from "@domains/post/util";

export class PostRepositoryImpl implements PostRepository {

    constructor(private readonly db: PrismaClient) {
    }

    wherePostsByAuthorId = (authorId: string, userId: string) => {
        return {
            authorId: authorId,
            mainPostId: null,
            OR: [
                {
                    authorId: userId
                },
                {
                    author: {
                        privacy: UserPrivacy.PUBLIC
                    }
                },
                {
                    author: {
                        followers: {
                            some: {
                                followerId: userId
                            }
                        }
                    }
                }
            ]
        }
    }

    pagination = (options: CursorPagination) => {
        if (!(options.before || options.after)) return undefined;
        return {
            cursor: {
                id: options.after ? options.after : options.before ? options.before : undefined
            },
            skip: options.after || options.before ? 1 : undefined,
            take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
        }
    }

    async getFollowedPosts(userId: string, options: CursorPagination): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
            where: {
                mainPostId: null,
                author: {
                    followers: {
                        some: {
                            followerId: userId
                        }
                    }
                }
            },
            include: {
                author: true
            },
            ...this.pagination(options),
        });
        return Promise.all(posts.map(post => createPostDTO(post)));
    }

    async create(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
        const post = await this.db.post.create({
            data: {
                authorId: userId,
                content: data.content,
                images: generateImageNames(data.images),
            },
            include: {
                author: true
            }
        });
        return createPostDTO(post);
    }

    async getPublicAndPrivateButFollowedPosts(options: CursorPagination, userId: string): Promise<PostDTO[]> {
        if (!(options.before || options.after)) {
            return await this.allFirstPage(options, userId);
        } else {
            return await this.allCursorPagination(options, userId);
        }
    }

    async delete(postId: string): Promise<void> {
        await this.db.post.delete({
            where: {
                id: postId
            }
        });
    }

    async getById(postId: string): Promise<PostDTO | null> {
        const post = await this.db.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true
            }
        });
        return post ? createPostDTO(post) : null;
    }

    async getByAuthorIdIfAuthorized(authorId: string, userId: string, options: CursorPagination): Promise<PostDTO[]> {
        if (options.before || options.after) {
            return await this.cursorPagination(authorId, userId, options);
        } else {
            return await this.getFirstPage(authorId, userId, options);
        }
    }

    async getByIdIfAvailable(user_id: string, post_id: string): Promise<PostDTO | null> {
        const post = await this.db.post.findFirst({
            where: {
                AND: [
                    {
                        id: post_id
                    },
                    {
                        OR: [
                            {
                                authorId: user_id
                            },
                            {
                                author: {
                                    privacy: "PUBLIC"
                                }
                            },
                            {
                                author: {
                                    followers: {
                                        some: {
                                            followerId: user_id
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            include: {
                author: true
            }
        });
        return post ? createPostDTO(post) : null;
    }

    async createComment(user_id: string, post_id: string, content: string, images: string[]): Promise<PostDTO | null> {
        const comment = await this.db.post.create({
            data: {
                authorId: user_id,
                content: content,
                images: generateImageNames(images),
                mainPostId: post_id
            },
            include: {
                author: true
            }
        });
        return comment ? createPostDTO(comment) : null;
    }

    async getTop10Comments(postId: string): Promise<PostDTO[]> {
        const result = await this.db.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                comments: {
                    take: 10,
                    orderBy: {
                        reactions: {
                            _count: "desc"
                        }
                    },
                    include: {
                        author: true
                    }
                }
            }
        });
        return result ? Promise.all(result.comments.map(post => createPostDTO(post))) : [];
    }

    async getCommentsByUser(userId: string, query_user_id: string): Promise<PostDTO[]> {
        const result = await this.db.post.findMany({
            where: {
                authorId: query_user_id,
                NOT: {
                    mainPostId: null
                },
                OR: [
                    {
                        authorId: userId
                    },
                    {
                        author: {
                            privacy: "PUBLIC"
                        }
                    },
                    {
                        author: {
                            followers: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                author: true
            }
        });
        return Promise.all(result.map(post => createPostDTO(post)));
    }

    private async allFirstPage(options: CursorPagination, userId: string): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
            where: {
                mainPostId: null,
                OR: [
                    {
                        author: {
                            privacy: "PUBLIC"
                        }
                    },
                    {
                        author: {
                            followers: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    }
                ]
            },
            take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
            orderBy: [
                {
                    createdAt: "desc"
                },
                {
                    id: "asc"
                }
            ],
            include: {
                author: true
            }
        });
        return Promise.all(posts.map(post => createPostDTO(post)));
    }

    private async allCursorPagination(options: CursorPagination, userId: string): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
            where: {
                mainPostId: null,
                OR: [
                    {
                        author: {
                            privacy: "PUBLIC"
                        }
                    },
                    {
                        author: {
                            followers: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    }
                ]

            },

            cursor: {
                id: options.after ? options.after : options.before ? options.before : undefined
            },
            skip: options.after || options.before ? 1 : undefined,
            take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
            orderBy: [
                {
                    createdAt: "desc"
                },
                {
                    id: "asc"
                }
            ],
            include: {
                author: true
            }
        });
        return Promise.all(posts.map(post => createPostDTO(post)));
    }

    private async getFirstPage(authorId: string, userId: string, options: CursorPagination): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
            where: this.wherePostsByAuthorId(authorId, userId)
            ,
            take: options.limit ?? 10,
            orderBy: [
                {
                    createdAt: "desc"
                }
            ],
            include: {
                author: true
            }
        });
        return Promise.all(posts.map(post => createPostDTO(post)));
    }

    private async cursorPagination(authorId: string, userId: string, options: CursorPagination): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
                where: this.wherePostsByAuthorId(authorId, userId),
                cursor: {
                    id: options.after ?? options.before
                },
                skip: options.after || options.before ? 1 : undefined,
                take: options.limit ?? 10,
                orderBy: [
                    {
                        createdAt: "desc"
                    }
                ],
            include: {
                author: true
            }
            })
        ;
        return Promise.all(posts.map(post => createPostDTO(post)));
    }
}
