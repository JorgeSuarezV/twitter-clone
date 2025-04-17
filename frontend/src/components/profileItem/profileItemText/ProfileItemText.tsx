import React from "react";
import {ProfileItemTextStyles, SuggestionSubtitleStyles, SuggestionTitleStyles} from "./ProfileItemTextStyles";


export type ProfileItemTextProps = {
    name: string;
    username: string;
    onClick?: () => void;
}

export function ProfileItemText({name, username, onClick}: ProfileItemTextProps) {

    return (
        <ProfileItemTextStyles>
            <SuggestionTitleStyles onClick={onClick} variant={"1"}
                                   boldBodyVariant={"Bold"}>{name}</SuggestionTitleStyles>
            <SuggestionSubtitleStyles onClick={onClick} variant={"2"}>{`@${username}`}</SuggestionSubtitleStyles>
        </ProfileItemTextStyles>
    )
}