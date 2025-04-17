import React from "react";
import {BigFrameStyle, InnerBigFrame} from "../frame/Frame";
import {MainHeader} from "../../pages/main/components/mainHeader/MainHeader";

export type BigFrameProps = {
    className?: string;
    title?: string;
    children: React.ReactNode;
    isScrollable?: boolean;
}

export function BigFrame({className, title, children, isScrollable}: BigFrameProps) {

    return (
        <BigFrameStyle className={className}>
            {title && <MainHeader>{title}</MainHeader>}
            <InnerBigFrame isScrollable={isScrollable}>
                {children}
            </InnerBigFrame>
        </BigFrameStyle>
    )
}