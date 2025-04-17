import {ReactionCountDTO, ReactionDTO} from "@domains/reaction/dto";
import { ReactionType } from "@prisma/client";

export interface ReactionService {
  reactToPost(user_id: string, post_id: string, reaction: string): Promise<ReactionDTO>
  deleteReaction(user_id: string, post_id: string, reaction: ReactionType): Promise<void>
  getReactions(user_id: string, query_user_id: string, reaction: ReactionType): Promise<ReactionDTO[]>
  getReactionsByPost(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionCountDTO>
}
