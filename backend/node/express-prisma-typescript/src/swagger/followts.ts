/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message
 */
/**
 * @swagger
 * /api/follower/follow/{user_id}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follower]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id to follow
 *     responses:
 *       200:
 *         description: The user was followed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Message'
 *             example:
 *               message: Followed successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Unauthorized. You are not logged in
 *               code: 401
 *               errors:
 *                 errorCode: Unauthorized
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: User not found
 *               code: 404
 *               errors:
 *                 errorCode: User not found
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: You are already following this user
 *               code: 409
 *               errors:
 *                 errorCode: You are already following this user
 */
/**
 * @swagger
 * /api/follower/unfollow/{user_id}:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Follower]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id to unfollow
 *     responses:
 *       200:
 *         description: The user was followed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Message'
 *             example:
 *               message: Unfollowed successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Unauthorized. You are not logged in
 *               code: 401
 *               errors:
 *                 errorCode: Unauthorized
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: You are not following this user
 *               code: 409
 *               errors:
 *                 errorCode: You are not following this user
 */