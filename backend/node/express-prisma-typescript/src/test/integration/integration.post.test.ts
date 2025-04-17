import {PrismaClient} from "@prisma/client";
import supertest from "supertest";
import {app} from "../../app";
import bcrypt from "bcrypt";

const user1Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNzhhZmIwYS1mZGNmLTQyODktYTAwMi1jNGNlMTA0ZDAyZGYiLCJpYXQiOjE2ODQyNDkwMzQsImV4cCI6MTg0MjAzNzAzNH0.725zrCNeTDkrt6tCZ46_dWGB9fbLcrY0NXH_4h7cl90"
describe("post integration test", () => {



    describe("create post", () => {

        beforeEach(async () => {
            process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
            const prisma = new PrismaClient()
            await deleteData(prisma)
            await createData(prisma)
        })


        test("should create post", async () => {
            const response = await supertest(app).post("/api/post/")
                .set("authorization", "Bearer " + user1Token)
                .send({
                    "content": "test post",
                })
            expect(response.status).toBe(201)
            expect(response.body).toEqual({
                "id": expect.any(String),
                "authorId": "378afb0a-fdcf-4289-a002-c4ce104d02df",
                "content": "test post",
                "images": [],
                "createdAt": expect.any(String),
            })
        })

        test("should not create post if not logged in", async () => {
            const response = await supertest(app).post("/api/post/")
                .send({
                    "content": "test post",
                })
            expect(response.status).toBe(401)
            expect(response.body.message).toEqual("Unauthorized. You must login to access this content.")
        })

        test("should not create post if content is empty", async () => {
            const response = await supertest(app).post("/api/post/")
                .set("authorization", "Bearer " + user1Token)
                .send({
                    "content": "",
                })
            expect(response.body.message).toEqual("Validation Error")
            expect(response.status).toBe(400)
        })
    })

    describe("get posts", () => {
        test("should get posts", async () => {
            const response = await supertest(app).get("/api/post/by_user/378afb0a-fdcf-4289-a002-c4ce104d02df")
                .query({
                    "limit": "10",
                })
                .set("authorization", "Bearer " + user1Token)
            expect(response.status).toBe(200)
            expect(response.body.length).toEqual(2)
            expect(response.body[0].content).toEqual("Greetings from User One!")
        })

        test("should get posts after with pagination", async () => {
            const response = await supertest(app).get("/api/post/by_user/378afb0a-fdcf-4289-a002-c4ce104d02df")
                .query({
                    "limit": "1",
                    "after": "538afb0a-fdcf-4289-a002-c4ce104d02df",
                })
                .set("authorization","Bearer " + user1Token)
            expect(response.status).toBe(200)
            expect(response.body.length).toEqual(1)
            expect(response.body[0].content).toEqual("Greetings from User One!")
        })

        test("should get posts before with pagination", async () => {
            const response = await supertest(app).get("/api/post/by_user/378afb0a-fdcf-4289-a002-c4ce104d02df")
                .query({
                    "limit": "1",
                    "before": "638afb0a-fdcf-4289-a002-c4ce104d02df",
                })
                .set("authorization","Bearer " + user1Token)
            expect(response.status).toBe(200)
            expect(response.body.length).toEqual(1)
            expect(response.body[0].content).toEqual("Hello from User One!")
        })
    })
})


async function deleteData(prisma: PrismaClient) {
    await prisma.user.deleteMany({});
    await prisma.follow.deleteMany({});
    await prisma.post.deleteMany({});
}

async function createData(prisma: PrismaClient) {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            id: "378afb0a-fdcf-4289-a002-c4ce104d02df",
            username: "user1",
            name: "User One",
            email: "user1@example.com",
            password: await bcrypt.hash("Password1!", 10),
            privacy: "PUBLIC",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "user2",
            name: "User Two",
            email: "user2@example.com",
            password: await bcrypt.hash("Password1!", 10),
            privacy: "PUBLIC",
        },
    });

    // Create users
    const user3 = await prisma.user.create({
        data: {
            username: "user3",
            name: "User Three",
            email: "user3@example.com",
            password: await bcrypt.hash("Password1!", 10),
            privacy: "PRIVATE",
        },
    });

    const user4 = await prisma.user.create({
        data: {
            username: "user4",
            name: "User Four",
            email: "user4@example.com",
            password: await bcrypt.hash("Password1!", 10),
            privacy: "PRIVATE",
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user3.id,
            followedId: user2.id,
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user2.id,
            followedId: user4.id,
        },
    });

    // Create posts
    const post1 = await prisma.post.create({
        data: {
            id: "538afb0a-fdcf-4289-a002-c4ce104d02df",
            authorId: user1.id,
            content: "Hello from User One!"
        },
    });

    const post2 = await prisma.post.create({
        data: {
            authorId: user2.id,
            content: "Greetings from User Two!",
        },
    });

    const post3 = await prisma.post.create({
        data: {
            id: "638afb0a-fdcf-4289-a002-c4ce104d02df",
            authorId: user1.id,
            content: "Greetings from User One!",
        }
    })

    // Create reactions
    const reaction1 = await prisma.reaction.create({
        data: {
            userId: user2.id,
            postId: post1.id,
            type: "LIKE",
        },
    });

    const reaction2 = await prisma.reaction.create({
        data: {
            userId: user1.id,
            postId: post2.id,
            type: "RETWEET",
        },
    });
}
