import React from "react";
import {ModalTitleStyles} from "../modal/modalTitle/ModalTitleStyles";
import {useTranslation} from "react-i18next";
import {Body} from "../body/Body";
import {ButtonContainer} from "../modal/ModalStyles";
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import {CustomIcon, IconContainer, LogOutModalStyles, TextContainer} from "./LogOutModalStyles";
import icon from "../../assets/icon.png";


export type LogOutModalProps = {
    active: boolean;
    cancelCallback: () => void;
}

export function LogOutModal({active, cancelCallback}: LogOutModalProps) {
    const [t] = useTranslation()
    const navigate = useNavigate();

    return (
        <LogOutModalStyles active={active}>
            <IconContainer>
                <CustomIcon src={icon} variant={"big"}/>
            </IconContainer>
            <TextContainer>
                <ModalTitleStyles>{t("logout title")}</ModalTitleStyles>
                <Body variant={"2"}>{t("logout body")}</Body>
            </TextContainer>
            <ButtonContainer>
                <Button variant={"follow"} size={"M"} onClick={() => navigate("/login")}>{t("Log out")}</Button>
                <Button variant={"outlined"} size={"M"} onClick={cancelCallback}>{t("Cancel")}</Button>
            </ButtonContainer>
        </LogOutModalStyles>
    )
}