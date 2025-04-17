import React from "react";
import {Modal} from "../modal/Modal";

export type CommentModalProps = {
    active: boolean;
}

export function CommentModal({active}: CommentModalProps) {

    return (
        <Modal active={active}>
            sda
        </Modal>
    )
}