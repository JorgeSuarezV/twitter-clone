import React from "react";
import {HeaderStyle, HeaderVariant} from "./HeaderStyles";

type HeaderProps = {
    variant: HeaderVariant;
    children: React.ReactNode;
    className?: string;
};

export default function Header({children, variant, className}: HeaderProps) {
    const CustomHeader = HeaderStyle(variant)
    return (
        <CustomHeader className={className}>
            {children}
        </CustomHeader>
    );
}