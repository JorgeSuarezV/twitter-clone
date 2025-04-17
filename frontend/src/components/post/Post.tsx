import React from "react";
import {ProfileItemImage} from "../profileItem/profileItemImage/ProfileItemImage";
import {DataContainer, PostBody, PostContainer, PostContentContainer, PostHeader, TitleContainer} from "./PostStyles";
import {Body} from "../body/Body";
import {LittleDotStyle} from "../littleDot/LittleDotsStyles";
import {LittleDots} from "../littleDot/LittleDots";
import {PostImages} from "../postImages/PostImages";
import {ReactionBar} from "../reactionBar/ReactionBar";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../util/hooks";
import {PostData} from "../../store/PostList";
import {DeletePostOption} from "../deletePostOption/DeletePostOption";


export type PostProps = {
    post: PostData
}


export function Post({post}: PostProps) {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.activeUser)
    const [showOptions, setShowOptions] = React.useState(true)

    const date = new Date(post.date)

    return (
        <PostContainer>
            <PostHeader>
                <DataContainer>
                    <ProfileItemImage profilePicture={post.profilePicture}
                                      onClick={() => navigate(`/profile/${post.authorId}`)}/>
                    <TitleContainer>
                        <Body variant={"1"} boldBodyVariant={"Bold"}>{post.authorName}</Body>
                        <Body variant={"1"}>{`@${post.authorUsername}`}</Body>
                        <LittleDotStyle/>
                        <Body variant={"1"}>{
                            date.toLocaleString('default', {month: 'short'}) +
                            " " + date.getDay()}</Body>
                    </TitleContainer>
                </DataContainer>
                {user.id === post.authorId && <LittleDots disappearDots={true}>
                    {showOptions && <DeletePostOption postId={post.id} onBlur={() => setShowOptions(false)}/>}
                </LittleDots>}
            </PostHeader>
            <PostContentContainer>
                <PostBody variant={"1"}>{post.postText}</PostBody>
                <PostImages images={post.postImages}/>
                <ReactionBar postId={post.id}/>
            </PostContentContainer>
        </PostContainer>
    )
}