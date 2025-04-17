import React from "react";
import {Reaction} from "../reaction/Reaction";
import commentIcon from "../../assets/Comment.svg";
import {CommentModal} from "../commentModal/CommentModal";


export type ReactionCommentProps = {
    postId: string;
}

export default function ReactionComment({postId}: ReactionCommentProps) {
    const [openModal, setOpenModal] = React.useState(false);
    const [count, setCount] = React.useState<number>(0);


    return (
        <>
            <CommentModal active={openModal}/>
            <Reaction icon={commentIcon}
                      onClick={() => setOpenModal(true)}
                      count={count}/>
        </>
    )
}