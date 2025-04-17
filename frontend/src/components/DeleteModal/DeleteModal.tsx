import React from "react";
import {ModalTitleStyles} from "../modal/modalTitle/ModalTitleStyles";
import {Body} from "../body/Body";
import {ButtonContainer} from "../modal/ModalStyles";
import Button from "../button/Button";
import {DeleteModalStyles} from "./DeleteModalStyles";
import {useTranslation} from "react-i18next";


export type DeleteModalProps = {
    active: boolean;
    closeFunction: () => void;
    onDelete: () => void;
}

export function DeleteModal({active, closeFunction, onDelete}: DeleteModalProps) {
    const [t] = useTranslation()

    return (
        <>
            <DeleteModalStyles active={active}>
                <ModalTitleStyles>
                    {t("Delete Tweet")}
                </ModalTitleStyles>
                <Body variant={"2"}>{t("Delete Tweet body")}</Body>
                <ButtonContainer>
                    <Button size={"M"} variant={"delete"} onClick={onDelete}>{t("Delete")}</Button>
                    <Button variant={"outlined"} size={"M"} onClick={closeFunction}>{t("Cancel")}</Button>
                </ButtonContainer>
            </DeleteModalStyles>
        </>
    )
}