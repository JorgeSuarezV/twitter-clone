import React, {useEffect} from "react";
import {NoRightSideLayout} from "../components/layout/noRightSide/NoRightSideLayout";
import {ProfileHeader} from "../../../components/profileHeaders/ProfileHeader";
import {PostList} from "../../../components/postList/PostList";
import {getPostsByAuthorId} from "../../../server/PostRequests";
import {useParams} from "react-router-dom";
import {getProfile} from "../../../server/UserRequests";
import {clearActiveProfileUser, setActiveProfileUser} from "../../../store/ActiveProfileUser";
import {useAppDispatch, useAppSelector} from "../../../util/hooks";


export function Profile() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((store) => store.activeUser)
    const profileUser = useAppSelector((store) => store.activeProfileUser)
    const {profileId} = useParams()

    useEffect(() => {
        if (profileId === user.id) {
            dispatch(setActiveProfileUser(user))
        } else {
            if (profileId === undefined) return
            getProfile(profileId).then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            dispatch(setActiveProfileUser(data))
                        })
                        break
                    default:
                        console.error(response.json().then((data: any) => data))
                }
            })
        }
        return () => {
            dispatch(clearActiveProfileUser())
        }
    }, [profileId])


    return (
        <>
            <NoRightSideLayout isScrollable={true}
                               title={profileUser.name}>
                <ProfileHeader/>
                {profileId &&
                    <PostList
                        queryFunction={(limit: number, skip: string | undefined) => getPostsByAuthorId(profileId, limit, skip)}/>}
            </NoRightSideLayout>
        </>

    )
}