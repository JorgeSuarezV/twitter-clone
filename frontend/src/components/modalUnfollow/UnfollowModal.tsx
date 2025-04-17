import React from "react";
import {UnfollowModalStyles} from "./UnfollowModalStyles";
import {ModalTitleStyles} from "../modal/modalTitle/ModalTitleStyles";
import {Body} from "../body/Body";
import Button from "../button/Button";
import {ButtonContainer} from "../modal/ModalStyles";
import {useTranslation} from "react-i18next";


export type UnfollowModalProps = {
    active: boolean;
    username: string;
    unFollowFunction: () => void;
    closeFunction: () => void;
}

export function UnfollowModal({active, username, unFollowFunction, closeFunction}: UnfollowModalProps) {
    const [t] = useTranslation()

    return (
        <UnfollowModalStyles active={active}>
            <ModalTitleStyles>{t("Unfollow")} <br/> {`@${username}`}?</ModalTitleStyles>
            <Body variant={"2"}>{t("Unfollow warning")}</Body>
            <ButtonContainer>
                <Button onClick={unFollowFunction} size={"M"} variant={"follow"}>{t("Unfollow")}</Button>
                <Button variant={"outlined"} size={"M"} onClick={closeFunction}>{t("Cancel")}</Button>
            </ButtonContainer>
        </UnfollowModalStyles>
    )
}