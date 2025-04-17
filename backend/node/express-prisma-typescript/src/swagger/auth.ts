/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         code:
 *           type: number
 *           description: Error code
 *         errorCode:
 *           type: object
 *           description: Error code
 *     LoginDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *         username:
 *           type: string
 *           description: user username
 *         password:
 *           type: string
 *           description: User password must contain lower case, upper case, number, special character and minimum 8 characters
 *       example:
 *         email: example@mail.com
 *         username: example
 *         password: Example123!
 *     SignupDTO:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *         username:
 *           type: string
 *           description: user username
 *         password:
 *           type: string
 *           description: User password must contain lower case, upper case, number, special character and minimum 8 characters
 *       example:
 *         email: example@mail.com
 *         username: example
 *         password: Example123!
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: The user was logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Validation Error
 *               code: 400
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Unauthorized. You must login to access this content.
 *               code: 401
 *               errors: { error_code: 'UNAUTHORIZED' }
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Internal Server Error
 *               code: 500
 *               errors: { error_code: 'INTERNAL_SERVER_ERROR' }
 */
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupDTO'
 *     responses:
 *       201:
 *         description: The user was signed up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Validation Error
 *               code: 400
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Conflict
 *               code: 409
 *               errorCode: { error_code: 'USER_ALREADY_EXISTS' }
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *               message: Internal Server Error
 *               code: 500
 *               errors: { error_code: 'INTERNAL_SERVER_ERROR' }
 */