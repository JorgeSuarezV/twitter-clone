import {FollowServiceImpl} from "@domains/follow/service";
import {FindRelationMockFollowRepository} from "../repository/find.relation.mock.follow.repository";
import {SuccessMockUserRepository} from "../repository/success.mock.user.repository";
import {describe, test} from "@jest/globals";
import {ConflictException, NotFoundException} from "@utils";
import {FailMockUserRepository} from "../repository/fail.mock.user.repository";
import {FindUserMockFollowRepository} from "../repository/find.user.mock.follow.repository";

describe("follower test", () => {
    describe("follow", () => {
        test("should throw conflict error if it is the same id", async () => {
            const service = new FollowServiceImpl(new FindRelationMockFollowRepository(), new SuccessMockUserRepository())
            const follower_id = "1";
            const followed_id = "1";
            try {
                await service.followUser(follower_id, followed_id)
            } catch (e: any) {
                expect(e instanceof ConflictException).toBe(true)
            }
        })


        test("should throw conflict error if follow relation already exists", async () => {
            const service = new FollowServiceImpl(new FindRelationMockFollowRepository(), new SuccessMockUserRepository())
            const follower_id = "49a915e0-f357-11ed-a05b-0242ac120003";
            const followed_id = "49a915e0-f357-11ed-a05b-0242ac120004";
            try {
                await service.followUser(follower_id, followed_id)
            }catch (e:any){
                expect(e instanceof ConflictException).toBe(true)
                expect(e.error).toEqual({error_code: "Follow relation already exists"})
            }
        })

        test("should throw not found error if followed user does not exist", async () => {
            const service = new FollowServiceImpl(new FindUserMockFollowRepository(), new FailMockUserRepository())
            const follower_id = "49a915e0-f357-11ed-a05b-0242ac120003";
            const followed_id = "49a915e0-f357-11ed-a05b-0242ac120005";
            try {
                await service.followUser(follower_id, followed_id)
            }catch (e:any) {
                expect(e instanceof NotFoundException).toBe(true)
                expect(e.message).toEqual( "Not found. Couldn't find User")
            }
        })

        test("should return follow relation", async () => {
            const service = new FollowServiceImpl(new FindUserMockFollowRepository(), new SuccessMockUserRepository())
            const follower_id = "49a915e0-f357-11ed-a05b-0242ac120003";
            const followed_id = "49a915e0-f357-11ed-a05b-0242ac120005";
            const result = await service.followUser(follower_id, followed_id)
            const n = new Date()
            result.createdAt = n
            expect(result).toEqual({
                id: "49a915e0-f357-11ed-a05b-0242ac120006",
                followerId: follower_id,
                followedId: followed_id,
                createdAt: n
            })
        })
    })
    describe("unfollow", () => {
        test("should throw not found error if follow relation does not exist", async () => {
            const service = new FollowServiceImpl(new FindUserMockFollowRepository(), new SuccessMockUserRepository())
            const follower_id = "49a915e0-f357-11ed-a05b-0242ac120003";
            const followed_id = "49a915e0-f357-11ed-a05b-0242ac120005";
            try {
                await service.unfollowUser(follower_id, followed_id)
            }catch (e:any) {
                expect(e instanceof NotFoundException).toBe(true)
                expect(e.message).toEqual( "Not found. Couldn't find Follow relation")
            }
        })

        test("should return void", async () => {
            const service = new FollowServiceImpl(new FindRelationMockFollowRepository(), new SuccessMockUserRepository())
            const follower_id = "49a915e0-f357-11ed-a05b-0242ac120003";
            const followed_id = "49a915e0-f357-11ed-a05b-0242ac120004";
            const result = await service.unfollowUser(follower_id, followed_id)
            expect(result).toBeUndefined()
        })
    })
})