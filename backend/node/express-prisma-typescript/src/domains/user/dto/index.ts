import {UserPrivacy} from "@prisma/client";
import {IsNotEmpty, IsString} from "class-validator";
import {getObjectUrl} from "@utils/s3.bucket";

export async function createProfilePictureUrl(userDTO: UserDTO): Promise<string> {
    if (userDTO.profilePicture) {
        return await getObjectUrl(userDTO.profilePicture)
    } else {
        return await getObjectUrl("default_profile_pic.jpeg")
    }
}

export async function createUserDTO(user: UserDTO) {
    user.profilePicture = await createProfilePictureUrl(user)
    return new UserDTO(user);
}

export class UserDTO {


    id: string;
    username: string;
    name: string | null;
    description: string | null;
    createdAt: Date;
    privacy: string;
    profilePicture: string | null;

    constructor(user: UserDTO) {
        this.username = user.username;
        this.privacy = user.privacy;
        this.id = user.id;
        this.name = user.name;
        this.createdAt = user.createdAt;
        this.description = user.description;
        this.profilePicture = user.profilePicture;
    }
}

export class PrivacyPostDTO {
    @IsString()
    @IsNotEmpty()
    privacy!: UserPrivacy
}

export class ExtendedUserDTO extends UserDTO {

    email!: string;
    password!: string;

    constructor(user: ExtendedUserDTO) {
        super(user)
        this.email = user.email;
        this.name = user.name;
        this.password = user.password;
    }
}
