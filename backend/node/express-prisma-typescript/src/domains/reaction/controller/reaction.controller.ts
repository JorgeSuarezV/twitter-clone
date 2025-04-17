import express from "express";
import { ReactionServiceImpl } from "@domains/reaction/service";
import { BodyValidation, db, ValidationException } from "@utils";
import { PostRepositoryImpl } from "@domains/post/repository";
import { ReactionRepositoryImpl } from "@domains/reaction/repository";
import { ReactionDTO, ReactToPostDto } from "@domains/reaction/dto";
import { ReactionType } from "@prisma/client";
import HttpStatus from "http-status";

export const reactionRouter = express.Router();

const reactionService = new ReactionServiceImpl(new ReactionRepositoryImpl(db), new PostRepositoryImpl(db));

reactionRouter.get("/:reaction/:query_user_id", async (req, res) => {
    const user_id: string = res.locals.context.userId;
    const query_user_id: string = req.params.query_user_id;
    const reaction: ReactionType = req.params.reaction as ReactionType;
    if (!(reaction in ReactionType)) throw new ValidationException([{reaction: "Invalid reaction type"}])

    const reactionDTO = await reactionService.getReactions(user_id, query_user_id, reaction);

    res.status(HttpStatus.OK).json(reactionDTO);
})


reactionRouter.get("/post/:reaction/:post_id", async (req, res) => {
    const user_id: string = res.locals.context.userId;
    const post_id: string = req.params.post_id;
    const reaction: ReactionType = req.params.reaction as ReactionType;
    if (!(reaction in ReactionType)) throw new ValidationException([{reaction: "Invalid reaction type"}])

    const reactionCount = await reactionService.getReactionsByPost(user_id, post_id, reaction);

    res.status(HttpStatus.OK).json(reactionCount);

})

reactionRouter.post("/:post_id", BodyValidation(ReactToPostDto), async (req, res) => {
    const user_id: string = res.locals.context.userId;
    const post_id: string = req.params.post_id;
    const reaction: ReactionType = req.body.reaction;

    const reactionDTO: ReactionDTO = await reactionService.reactToPost(user_id, post_id, reaction);

    res.status(HttpStatus.CREATED).json(reactionDTO);
})

reactionRouter.delete("/:post_id", BodyValidation(ReactToPostDto), async (req, res) => {
    const user_id: string = res.locals.context.userId;
    const post_id: string = req.params.post_id;
    const reaction: ReactionType = req.body.reaction;

    await reactionService.deleteReaction(user_id, post_id, reaction)

    res.status(HttpStatus.OK).json({message: "delete successful"})
})