import {SignupInputDTO} from "@domains/auth/dto";
import {PrismaClient, UserPrivacy} from "@prisma/client";
import {OffsetPagination} from "@types";
import {createUserDTO, ExtendedUserDTO, UserDTO} from "../dto";
import {UserRepository} from "./user.repository";

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly db: PrismaClient) {
    }

    async searchUsers(search_string: string, limit: number): Promise<UserDTO[]> {
        const result = await this.db.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            mode: "insensitive",
                            contains: search_string
                        }
                    },
                    {
                        name: {
                            mode: "insensitive",
                            contains: search_string
                        }
                    }
                ]
            },
            orderBy: [
                {
                    followers: {
                        _count: "desc"
                    }
                },
                {
                    id: "asc"
                }
            ],
            take: limit
        })
        return Promise.all(result.map(user => createUserDTO(user)));
    }

    async create(data: SignupInputDTO): Promise<UserDTO> {
        return await this.db.user.create({
            data
        }).then(user => createUserDTO(user));
    }

    async getById(userId: any): Promise<UserDTO | null> {
        const user = await this.db.user.findUnique({
            where: {
                id: userId
            }
        });
        return user ? createUserDTO(user) : null;
    }

    async delete(userId: any): Promise<void> {
        await this.db.user.delete({
            where: {
                id: userId
            }
        });
    }

    async getRecommendedUsersPaginated(userId: string, options: OffsetPagination): Promise<UserDTO[]> {
        const users = await this.db.user.findMany({
            where: {
                AND: [
                    {
                        followers: {
                            some: {
                                follower: {
                                    followers: {
                                        some: {
                                            follower: {
                                                id: userId
                                            }
                                        }
                                    }
                                }
                            },
                            none: {
                                follower: {
                                    id: userId
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            id: userId
                        }
                    },
                ]
            },
            skip: options.skip,
            take: options.limit,
            orderBy: [
                {
                    followers: {
                        _count: "desc"
                    }
                },
                {
                    username: "asc"
                },
                {
                    id: "asc"
                }
            ]
        });
        return Promise.all(users.map(user => createUserDTO(user)));
    }

    async getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null> {
        const user = await this.db.user.findFirst({
            where: {
                OR: [
                    {
                        email
                    },
                    {
                        username
                    }
                ]
            }
        });
        return user ? new ExtendedUserDTO(user) : null;
    }

    async updatePrivacy(userId: string, privacy: UserPrivacy): Promise<void> {
        await this.db.user.update({
            where: {
                id: userId
            },
            data: {
                privacy
            }
        });
    }

    async updateProfilePic(userId: string, preSignedURL: string): Promise<UserDTO> {
        const user = await this.db.user.update({
            where: {
                id: userId
            },
            data: {
                profilePicture: preSignedURL
            }
        })
        return createUserDTO(user);
    }
}
