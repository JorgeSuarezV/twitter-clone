import React, {useState} from "react";
import {ButtonVariant} from "../button/ButtonStyles";
import {FollowButtonStyles} from "./FollowButtonStyles";
import {followRequest, unfollowRequest} from "../../server/FollowRequests";
import {UnfollowModal} from "../modalUnfollow/UnfollowModal";
import {useTranslation} from "react-i18next";


export type FollowButtonProps = {
    id: string;
    className?: string;
    isFollowing: boolean;
    followCallback: (id: string) => void;
    unfollowCallback: (id: string) => void;
    username: string,
}

export function FollowButton({
                                 className,
                                 id,
                                 isFollowing,
                                 followCallback,
                                 unfollowCallback,
                                 username
                             }: FollowButtonProps) {
    const [t] = useTranslation()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const text = isFollowing ? t("Following") : t("Follow")
    const variant: ButtonVariant = isFollowing ? "outlined" : "follow"

    function followUser(id: string) {
        followRequest(id)
            .then(response => {
                switch (response.status) {
                    case 200:
                        followCallback(id)
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
    }

    function unfollow(id: string) {
        unfollowRequest(id)
            .then(response => {
                switch (response.status) {
                    case 200:
                        unfollowCallback(id)
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
    }


    return (
        <>
            <UnfollowModal active={openModal} unFollowFunction={() => {
                unfollow(id)
                setOpenModal(false)
            }} username={username} closeFunction={() => setOpenModal(false)}/>
            <FollowButtonStyles className={className} id={id}
                                onClick={isFollowing ? () => setOpenModal(true) : () => followUser(id)}
                                size={"S"}
                                variant={variant}>{text}</FollowButtonStyles>
        </>
    )
}