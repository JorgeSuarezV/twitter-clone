import {ReactionCountDTO, ReactionDTO} from "@domains/reaction/dto";
import { ReactionType } from "@prisma/client";

export interface ReactionRepository {
  getReactionByUserAndPostId(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO | null>;
  reactToPost(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionDTO>;
  deleteReaction(reaction_id: string): Promise<void>;
  getReactions(user_id: string, query_user_id: string, reaction: ReactionType): Promise<ReactionDTO[]>;
  getReactionsByPostAndType(user_id: string, post_id: string, reaction: ReactionType): Promise<ReactionCountDTO>;
}