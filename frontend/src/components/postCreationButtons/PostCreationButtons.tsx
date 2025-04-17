import React from "react";
import image from "../../assets/Image.svg";
import {ButtonsContainer, LoadImageIcon, TweetButton} from "./PostCreationButtonsStyles";
import {useTheme} from "styled-components";

export type PostCreationButtonsProps = {
    className?: string;
    onImageUpload: () => void;
    disabled: boolean;
    createTweet: () => void;
    hasLine?: boolean
}


export function PostCreationButtons({
                                        className,
                                        onImageUpload,
                                        disabled,
                                        createTweet,
                                        hasLine
                                    }: PostCreationButtonsProps) {
    const theme: any = useTheme()

    return (
        <ButtonsContainer className={className} hasLine={hasLine}>
            <LoadImageIcon variant={"medium"} src={image} fill={theme.colors.main}
                           onClick={onImageUpload}/>
            <TweetButton disabled={disabled} size={"S"} variant={"default"}
                         onClick={createTweet}>Tweet</TweetButton>
        </ButtonsContainer>
    )
}