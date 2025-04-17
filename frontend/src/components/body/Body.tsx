import React from "react";
import {BodyBoldVariant, BodyStyles, BodyVariant} from "./BodyStyles";


export type BodyProps = {
    children: React.ReactNode;
    variant: BodyVariant;
    boldBodyVariant?: BodyBoldVariant;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

export function Body({variant, boldBodyVariant = "Normal", children, className, onClick}: BodyProps) {

    return (
        <BodyStyles onClick={onClick} className={className} variant={variant} boldVariant={boldBodyVariant}>
            {children}
        </BodyStyles>
    )

}