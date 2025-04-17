import { Request, Response, Router } from "express";
import HttpStatus from "http-status";
import "express-async-errors";

import { BodyValidation, db } from "@utils";

import { UserRepositoryImpl } from "../repository";
import { UserService, UserServiceImpl } from "../service";
import { PrivacyPostDTO } from "@domains/user/dto";
import { UserPrivacy } from "@prisma/client";
import { getObjectUrl, putObjectUrl } from "@utils/s3.bucket";

export const userRouter = Router();

// Use dependency injection
const service: UserService = new UserServiceImpl(new UserRepositoryImpl(db));

userRouter.get("/", async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { limit, skip } = req.query as Record<string, string>;

  const users = await service.getUserRecommendations(userId, { limit: Number(limit), skip: Number(skip) });

  return res.status(HttpStatus.OK).json(users);
});

userRouter.get("/search/:search_string", async (req: Request, res: Response) => {
    const { search_string } = req.params;
    const limit = req.query.limit || 10;

    const users = await service.searchUsers(search_string, Number(limit));

    return res.status(HttpStatus.OK).json(users);
})

userRouter.post("/profile_pic", async (req: Request, res: Response) => {
  const { userId } = res.locals.context;

  // const preSignedURL = presignedPUTURL(userId + '-profile_pic');
  const preSignedURL = await putObjectUrl(userId + "-profile_pic");
  const user = await service.updateProfilePic(userId, userId + "-profile_pic");

  res.status(HttpStatus.OK).json({ url: preSignedURL });
  });

userRouter.get("/me", async (req: Request, res: Response) => {
  const { userId } = res.locals.context;

  const user = await service.getUser(userId);

  return res.status(HttpStatus.OK).json(user);
});

userRouter.get("/:userId", async (req: Request, res: Response) => {
  const { userId: otherUserId } = req.params;

  const user = await service.getUser(otherUserId);

  return res.status(HttpStatus.OK).json(user);
});

userRouter.post("/privacy", BodyValidation(PrivacyPostDTO), async (req: Request, res: Response) => {
  const userId: string = res.locals.context.userId;
  const privacy: UserPrivacy = req.body.privacy;

  await service.updatePrivacy(userId, privacy);

  res.status(HttpStatus.OK).json({ privacy: privacy });
});

userRouter.delete("/", async (req: Request, res: Response) => {
  const { userId } = res.locals.context;

  await service.deleteUser(userId);

  return res.status(HttpStatus.OK).json({ message: "User deleted" });
});
