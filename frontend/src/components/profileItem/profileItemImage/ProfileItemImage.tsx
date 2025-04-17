import React from "react";
import {ProfileItemImageContainerStyles, ProfileItemImageStyles} from "./ProfileItemImageStyles";

export type ProfileItemImageProps = {
    profilePicture: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function ProfileItemImage({profilePicture, onClick}: ProfileItemImageProps) {

    return (
        <ProfileItemImageContainerStyles>
            <ProfileItemImageStyles alt={""} onClick={onClick} src={profilePicture}></ProfileItemImageStyles>
        </ProfileItemImageContainerStyles>
    )
}