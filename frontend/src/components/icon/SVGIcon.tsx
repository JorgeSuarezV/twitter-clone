import React from "react";
import {IconVariant, SVGIconStyle} from "./IconStyles";

type IconProps = {
    className?: string;
    variant: IconVariant;
    src: string;
    onClick?: () => void;
    fill?: string;
};

export default function SVGIcon({className, variant, src, onClick, fill}: IconProps) {
    return <SVGIconStyle fill={fill} className={className} variant={variant} src={src} onClick={onClick}/>;
}
