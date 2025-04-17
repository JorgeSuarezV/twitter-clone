import React from "react";
import {ReactionBarContainer} from "./ReactionBarStyles";
import retweetIcon from "../../assets/Retweet.svg";
import likeIcon from "../../assets/Like.svg";
import ReactionComment from "../reactionComment/ReactionComment";
import {ReactionSimple} from "../reactionSimple/ReactionSimple";
import {useTheme} from "styled-components";

export type ReactionBarProps = {
    postId: string;
}

export function ReactionBar({postId}: ReactionBarProps) {
    const theme: any = useTheme();
    const retweetFill = theme.colors.main;
    const likeFill = theme.colors.error;

    return (
        <ReactionBarContainer>
            <ReactionComment postId={postId}/>
            <ReactionSimple postId={postId} reactionType={"RETWEET"}
                            icon={retweetIcon} fill={retweetFill}/>
            <ReactionSimple postId={postId} reactionType={"LIKE"}
                            icon={likeIcon} fill={likeFill}/>
        </ReactionBarContainer>
    )
}