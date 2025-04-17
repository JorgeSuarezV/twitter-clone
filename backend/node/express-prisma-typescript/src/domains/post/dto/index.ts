import {ArrayMaxSize, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {createUserDTO, UserDTO} from "@domains/user/dto";
import {getObjectUrl} from "@utils/s3.bucket";

export class CreatePostInputDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(240)
    content!: string;

    @ArrayMaxSize(4)
    @IsOptional()
    @IsString({each: true})
    images!: string[];
}


export async function createPostDTO(post: PostDTO) {
    post.author = await createUserDTO(post.author)
    post.images = await Promise.all(post.images.map(image => getObjectUrl(`post/${post.id}/${image}`)));
    return new PostDTO(post);
}

export class PostDTO {

    id: string;
    author: UserDTO;
    content: string;
    images: string[];
    createdAt: Date;
    comments?: PostDTO[];

    constructor(post: PostDTO) {
        this.id = post.id;
        this.author = post.author;
        this.content = post.content;
        this.images = post.images;
        this.createdAt = post.createdAt;
        this.comments = post.comments;
    }
}
