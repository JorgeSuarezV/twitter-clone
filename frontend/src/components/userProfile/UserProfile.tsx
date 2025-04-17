import React from "react";
import {useAppSelector} from "../../util/hooks";
import {ImageAndTextContainer, TextContainer, UserProfileContainer} from "./UserProfileStyles";
import {LittleDots} from "../littleDot/LittleDots";
import {ProfileImage} from "../../pages/main/profile/ProfileStyles";
import {Body} from "../body/Body";
import {Subtitle} from "../subtitle/Subtitle";
import {UserProfileMenu} from "../userProfileMenu/UserProfileMenu";

export function UserProfile() {
    const user = useAppSelector((state: any) => state.activeUser);

    return (
        <UserProfileContainer>
            <ImageAndTextContainer>
                <ProfileImage src={user.profilePicture} alt={""}/>
                <TextContainer>
                    <Body variant={"1"} boldBodyVariant={"Bold"}>{user.name}</Body>
                    <Subtitle variant={"2"}>{`@${user.username}`}</Subtitle>
                </TextContainer>
            </ImageAndTextContainer>
            <LittleDots disappearDots={false}>
                <UserProfileMenu/>
            </LittleDots>
        </UserProfileContainer>
    )
}
