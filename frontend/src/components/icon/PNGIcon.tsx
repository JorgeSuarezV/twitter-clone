import React from "react";
import {IconVariant, PNGIconStyle} from "./IconStyles";

type IconProps = {
    className?: string;
    variant: IconVariant;
    src: string;
    onClick?: () => void;
};

export default function PNGIcon({className, variant, src, onClick}: IconProps) {
    return <PNGIconStyle className={className} variant={variant} src={src} onClick={onClick}/>;
}
