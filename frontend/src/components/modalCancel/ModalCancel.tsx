import React from "react";
import {ModalCancelStyles} from "./ModalCancelStyles";


export type ModalCancelProps = {
    onClick: () => void;
    svgIcon: string;
}

export function ModalCancel({onClick, svgIcon}: ModalCancelProps) {

    return (
        <ModalCancelStyles variant={"medium"} src={svgIcon} onClick={onClick}/>
    )
}