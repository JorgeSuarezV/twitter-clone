import {ReactionCountDTO, ReactionDTO} from "@domains/reaction/dto";
import { ReactionService } from "@domains/reaction/service/reaction.service";
import { PostRepository } from "@domains/post/repository";
import { ReactionRepository } from "@domains/reaction/repository";
import { ConflictException, NotFoundException } from "@utils";
import { ReactionType } from "@prisma/client";


export class ReactionServiceImpl implements ReactionService {
  constructor(
    private readonly reactionRepository: ReactionRepository,
    private readonly postRepository: PostRepository
  ) {}

  async reactToPost(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO> {
    const post = await this.postRepository.getByIdIfAvailable(user_id, post_id);
    if (!post) throw new NotFoundException("Post");
    const actualReaction = await this.reactionRepository.getReactionByUserAndPostId(user_id, post_id, reaction)
    if (actualReaction) throw new ConflictException("Reaction already exists");
    return await this.reactionRepository.reactToPost(user_id, post_id, reaction);
  }

  async deleteReaction(user_id: string, post_id: string, reaction: ReactionType): Promise<void> {
    const actualReaction = await this.reactionRepository.getReactionByUserAndPostId(user_id, post_id, reaction)
    if (!actualReaction) throw new NotFoundException("Reaction")
    await this.reactionRepository.deleteReaction(actualReaction.id)
  }

  async getReactions(user_id: string, query_user_id: string, reaction: ReactionType): Promise<ReactionDTO[]> {
    return this.reactionRepository.getReactions(user_id, query_user_id, reaction);
  }

  async getReactionsByPost(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionCountDTO> {
    return this.reactionRepository.getReactionsByPostAndType(user_id, post_id, reaction);
  }
}