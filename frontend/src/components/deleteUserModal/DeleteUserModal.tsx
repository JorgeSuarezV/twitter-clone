import React from "react";
import {ModalTitleStyles} from "../modal/modalTitle/ModalTitleStyles";
import {Body} from "../body/Body";
import {ButtonContainer} from "../modal/ModalStyles";
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import {deleteUser} from "../../server/UserRequests";
import {DeleteModalUserStyles} from "./DeleteUserModalStyles";
import {useTranslation} from "react-i18next";

export type DeleteUserModalProps = {
    active: boolean;
    closeFunction: () => void;
}


export function DeleteUserModal({active, closeFunction}: DeleteUserModalProps) {
    const navigate = useNavigate()
    const [t] = useTranslation()

    function deleteUserFunc() {
        deleteUser()
        navigate("/login")
    }


    return (
        <DeleteModalUserStyles active={active}>
            <ModalTitleStyles>
                {t("Delete Account")}
            </ModalTitleStyles>
            <Body variant={"2"}>{t("Delete account body")}</Body>
            <ButtonContainer>
                <Button variant={"delete"} size={"M"} onClick={() => deleteUserFunc()}>{t("Delete")}</Button>
                <Button variant={"outlined"} size={"M"} onClick={closeFunction}>{t("Cancel")}</Button>
            </ButtonContainer>
        </DeleteModalUserStyles>
    )
}