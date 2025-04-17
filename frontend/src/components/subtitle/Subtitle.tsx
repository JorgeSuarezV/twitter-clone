import React from "react";
import {SubtitleStyles, SubtitleVariant} from "./SubtitleStyles";

export type SubtitleProps = {
    children: string;
    variant: SubtitleVariant;
    className?: string;
    onClick?: () => void;
}

export function Subtitle({variant, children, className, onClick}: SubtitleProps) {

    return (
        <SubtitleStyles onClick={onClick} className={className} variant={variant}>
            {children}
        </SubtitleStyles>
    )
}