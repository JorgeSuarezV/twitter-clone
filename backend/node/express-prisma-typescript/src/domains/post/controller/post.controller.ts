import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import "express-async-errors";

import { db, BodyValidation } from "@utils";

import { PostRepositoryImpl } from '../repository';
import { PostService, PostServiceImpl } from '../service';
import { CreatePostInputDTO } from '../dto';
import {FollowRepositoryImpl} from "@domains/follow/repository";


export const postRouter = Router();

// Use dependency injection
const service: PostService = new PostServiceImpl(new PostRepositoryImpl(db), new FollowRepositoryImpl(db));

postRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { limit, before, after } = req.query as Record<string, string>;

  const posts = await service.getLatestPosts(userId, { limit: Number(limit), before, after });

  return res.status(HttpStatus.OK).json(posts);
});

postRouter.get('/followed', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { limit, before, after } = req.query as Record<string, string>;

  const posts = await service.getFollowedPosts(userId, { limit: Number(limit), before, after });

  return res.status(HttpStatus.OK).json(posts);
});

postRouter.get('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { postId } = req.params;

  const post = await service.getPost(userId, postId);

  return res.status(HttpStatus.OK).json(post);
});

postRouter.get('/by_user/:userId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { userId: authorId } = req.params;
  const { limit, before, after } = req.query as Record<string, string>;

  const posts = await service.getPostsByAuthor(userId, authorId, { limit: Number(limit), before, after });

  return res.status(HttpStatus.OK).json(posts);
});

postRouter.get('/comment/:user_id', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const query_user_id: string = req.params.user_id;

  const comments = await service.getCommentsByUser(userId, query_user_id);

  res.status(HttpStatus.OK).json(comments);
})

postRouter.post('/', BodyValidation(CreatePostInputDTO) ,async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const data = req.body;

  const post = await service.createPost(userId, data);

  return res.status(HttpStatus.CREATED).json(post);
});

postRouter.post('/comment/:post_id', BodyValidation(CreatePostInputDTO) ,async (req: Request, res: Response) => {
  const userId = res.locals.context.userId;
  const { post_id } = req.params;
  const {content, images} = req.body;

  const comment = await service.createComment(userId, post_id, content, images);
  return res.status(HttpStatus.CREATED).json(comment);
})

postRouter.delete('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { postId } = req.params;

  await service.deletePost(userId, postId);

  return res.status(HttpStatus.OK).json({ message: 'Post deleted' });
});
