import React from "react";
import {BackgroundStyles, ModalStyles} from "./ModalStyles";


export type ModalProps = {
    active: boolean;
    className?: string;
    children: React.ReactNode;
}

export function Modal({active, className, children}: ModalProps) {

    return (
        <>
            {active &&
                <BackgroundStyles>
                    <ModalStyles className={className}>
                        {children}
                    </ModalStyles>
                </BackgroundStyles>
            }
        </>
    )
}