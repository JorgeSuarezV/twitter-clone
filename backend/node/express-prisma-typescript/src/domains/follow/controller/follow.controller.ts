import {Request, Response, Router} from "express";
import { db } from "@utils";
import HttpStatus from "http-status";
import { UserRepositoryImpl } from "@domains/user/repository";
import { FollowServiceImpl } from "@domains/follow/service";
import { FollowRepositoryImpl } from "@domains/follow/repository";


export const followRouter = Router();
const service = new FollowServiceImpl(new FollowRepositoryImpl(db), new UserRepositoryImpl(db));

followRouter.post('/follow/:user_id',  async (req: Request, res: Response) => {
    const follower_id = res.locals.context.userId;
    const followed_id= req.params.user_id;

    await service.followUser(follower_id, followed_id);

    return res.status(HttpStatus.OK).json("Followed successfully");
})

followRouter.post('/unfollow/:user_id', async (req: Request, res: Response) => {
    const follower_id = res.locals.context.userId;
    const followed_id= req.params.user_id;

    await service.unfollowUser(follower_id, followed_id);

    return res.status(HttpStatus.OK).json({message: 'Unfollowed successfully'});
})

followRouter.get('/follows/:user_id', async (req: Request, res: Response) => {
    const user_id: string = res.locals.context.userId;
    const follow_user_id: string = req.params.user_id;

    const follows = await service.getFollowRelation(user_id, follow_user_id);

    return res.status(HttpStatus.OK).json(follows);
})

