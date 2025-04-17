import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFollowRelationRequest} from "../../server/FollowRequests";
import {
    Description,
    ProfileDataBody,
    ProfileDataContainer,
    ProfileDataHeader,
    ProfileImage,
    ProfileImageAndTextContainer,
    ProfileTextContainer
} from "../../pages/main/profile/ProfileStyles";
import Button from "../button/Button";
import {FollowButton} from "../followButton/FollowButton";
import {useAppSelector} from "../../util/hooks";
import {deleteUser} from "../../server/UserRequests";
import {DeleteUserModal} from "../deleteUserModal/DeleteUserModal";
import {useTranslation} from "react-i18next";


export function ProfileHeader() {
    const user = useAppSelector((store) => store.activeUser)
    const profileUser = useAppSelector((store) => store.activeProfileUser)
    const {profileId} = useParams()
    const [isMe, setIsMe] = React.useState<boolean>(false)
    const [isFollowing, setIsFollowing] = React.useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const [t] = useTranslation()


    useEffect(() => {
        profileId === user.id ? setIsMe(true) : setIsMe(false)
        if (profileId !== user.id) loadOtherProfile()
    }, [profileId])


    function loadOtherProfile(): any {
        if (profileId === undefined) return
        getFollowRelationRequest(profileId)
            .then(response => {
                switch (response.status) {
                    case 200:
                        setIsFollowing(true)
                        break;
                    case 404:
                        setIsFollowing(false)
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
    }

    function deleteProfile() {
        deleteUser().then(response => {
            switch (response.status) {
                case 200:
                    response.json().then((data: any) => {
                        console.log(data)
                        navigate("/login")
                    })
                    break
                default:
                    console.error(response.json().then((data: any) => data))
            }
        })
    }

    return (
        profileUser && <>
            <DeleteUserModal active={openDeleteModal} closeFunction={() => setOpenDeleteModal(false)}/>
            <ProfileDataContainer>
                <ProfileImageAndTextContainer>
                    <ProfileImage size={"L"} src={profileUser.profilePicture} alt={""}/>
                    <ProfileTextContainer>
                        <ProfileDataHeader variant={"5"}>{profileUser.name}</ProfileDataHeader>
                        <ProfileDataBody variant={"1"}>{`@${profileUser.username}`}</ProfileDataBody>
                        <Description variant={"1"}>{profileUser.description}</Description>
                    </ProfileTextContainer>
                </ProfileImageAndTextContainer>
                {isMe && <Button variant={"delete"} size={"S"}
                                 onClick={() => setOpenDeleteModal(true)}>{t("Delete")}</Button>}
                {!isMe && <FollowButton id={profileUser.id} isFollowing={isFollowing}
                                        followCallback={() => setIsFollowing(true)}
                                        unfollowCallback={() => setIsFollowing(false)}
                                        username={profileUser.username}
                />}
            </ProfileDataContainer>
        </>
    )
}