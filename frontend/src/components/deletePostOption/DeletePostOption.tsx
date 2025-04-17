import React from "react";
import {DeleteButton} from "./DeletePostOptionStyles";
import SVGIcon from "../icon/SVGIcon";
import deleteIcon from "../../assets/Delete.svg"
import {DeleteModal} from "../DeleteModal/DeleteModal";
import {deletePost} from "../../server/PostRequests";
import {setPosts} from "../../store/PostList";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../util/hooks";
import {useTranslation} from "react-i18next";

export type DeletePostOptionProps = {
    postId: string;
    onBlur?: () => void;
}

export function DeletePostOption({postId, onBlur}: DeletePostOptionProps) {
    const [t] = useTranslation()
    const [openModal, setOpenModal] = React.useState(false);
    const dispatch = useDispatch()
    const postList = useAppSelector(state => state.postList.posts)

    function deletePostFunc(id: string) {
        deletePost(id).then(response => {
            switch (response.status) {
                case 200:
                    const newPosts = postList.filter(post => post.id !== id)
                    dispatch(setPosts(newPosts))
                    break;
                default:
                    console.error("Something went wrong. Try again later.")
            }
        })
    }


    return (
        <>
            <DeleteModal closeFunction={() => setOpenModal(false)} onDelete={() => deletePostFunc(postId)}
                         active={openModal}/>
            {!openModal && <DeleteButton onClick={() => setOpenModal(true)} onBlur={onBlur}>
                <SVGIcon variant={"medium"} src={deleteIcon}/>
                {t("Delete")}
            </DeleteButton>}
        </>
    )
}