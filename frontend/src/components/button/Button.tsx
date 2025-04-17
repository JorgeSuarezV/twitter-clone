import React from "react";
import {ButtonSize, ButtonStyle, ButtonVariant} from "./ButtonStyles";


export type ButtonProps = {
    id?: string
    variant: ButtonVariant;
    size: ButtonSize;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}


export default function Button({id, variant, size, onClick, children, disabled, className}: ButtonProps) {
    return (
        <ButtonStyle disabled={disabled} id={id} className={className} onClick={onClick} size={size} variant={variant}>
            {children}
        </ButtonStyle>
    );
}