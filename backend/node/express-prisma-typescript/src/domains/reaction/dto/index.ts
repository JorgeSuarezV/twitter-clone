import { IsNotEmpty, IsString, IsUppercase } from "class-validator";
import { ReactionType } from "@prisma/client";
import { PostDTO } from "@domains/post/dto";

export class ReactToPostDto{

  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  reaction!: ReactionType;
}

export class ReactionDTO {
  constructor(reaction: ReactionDTO) {
    this.id = reaction.id;
    this.postId = reaction.postId;
    this.userId = reaction.userId;
    this.type = reaction.type;
    this.createdAt = reaction.createdAt;
    if (!reaction.post) return
  }

  id: string;
  postId: string;
  userId: string;
  type: string;
  createdAt: Date;
  post?: PostDTO;
}

export class ReactionCountDTO {
    constructor(reaction: ReactionCountDTO) {
        this.count = reaction.count;
        this.isReacted = reaction.isReacted;
    }

    count: number;
    isReacted: boolean;
}