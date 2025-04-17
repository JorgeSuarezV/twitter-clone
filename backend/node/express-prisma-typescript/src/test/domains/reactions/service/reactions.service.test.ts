import {ReactionServiceImpl} from "@domains/reaction/service";
import {MockFoundReactionRepository} from "../repository/mock.found.reaction.repository";
import {MockFoundPostRepository} from "../repository/mock.found.post.repository";

describe("reactions test", () => {
    describe("react to post",  () => {
        test("should not react as reaction already exists", async () => {
            const service = new ReactionServiceImpl(new MockFoundReactionRepository(), new MockFoundPostRepository())
            try {
                await service.reactToPost("1", "1", "LIKE")
            } catch (e:any) {
                expect(e.error).toEqual({error_code: "Reaction already exists"})
            }
        })
    })
})