/**
 * @swagger
 * components:
 *   schema:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - website
 *         - city
 *         - company
 *       properties:
 *         name:
 *           type: string
 *           description: username of the client or trainer
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: string
 *           description: The user phone
 *         website:
 *           type: number
 *           description: The user website
 *         city:
 *           type: string
 *           description: The user city
 *         company:
 *           type: string
 *           description: The user company
 */

/**
 * @swagger
 * components:
 *   schema:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         userId:
 *           type: number
 *           description: The userId of the post.
 *         title:
 *           type: string
 *           description: Post Heading
 *         body:
 *           type: string
 *           description: Information of that post.
 */

/**
 * @swagger
 * /users/fetchUsers:
 *   get:
 *       summary: To retrieve information about all the users who are registered in the database.
 *       tags: [User]
 *       responses:
 *           200:
 *               description: All user data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /users//fetchUserById/:id:
 *   get:
 *       summary: To retrieve information about one perticular users who are in the database.
 *       tags: [User]
 *       responses:
 *           200:
 *               description: Single user data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /users/fetchUserByEmail/:email:
 *   get:
 *       summary: To retrieve information about the users who are registered in the database using email.
 *       tags: [User]
 *       responses:
 *           200:
 *               description: All user data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /users/addUser:
 *   post:
 *       summary: To add user data in database.
 *       tags: [User]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/User'
 *       responses:
 *           200:
 *               description: User Data Added in Database Successfully.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /posts/fetchPosts/:userId:
 *   get:
 *       summary: To retrieve information about all posts of one perticular users.
 *       tags: [Post]
 *       responses:
 *           200:
 *               description: User all posts data fetch.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Post'
 *           400:
 *               description: Something went wrong to fetch Post Data
 */

/**
 * @swagger
 * /posts/downloadPostsInExcel/:userId:
 *   get:
 *       summary: Download all post data in the excel format.
 *       tags: [Post]
 *       responses:
 *           200:
 *               description: User all posts data in excel.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Post'
 *           400:
 *               description: Something went wrong to fetch Post Data
 */

/**
 * @swagger
 * /posts/bulkAddPosts/:userId:
 *   post:
 *       summary: Store all the posts of that users into the database..
 *       tags: [Post]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Post'
 *       responses:
 *           200:
 *               description: Post Data Added in Database Successfully.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Post'
 *           400:
 *               description: Some server error
 */
