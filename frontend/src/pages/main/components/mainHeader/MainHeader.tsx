import React from "react";
import {MainHeaderDivStyles, MainHeaderStyles} from "./MainHeaderStyles";

export type MainHeaderProps = {
    children: React.ReactNode;
}

export function MainHeader({children}: MainHeaderProps) {

    return (
        <MainHeaderDivStyles>
            <MainHeaderStyles variant={"5"}>{children}</MainHeaderStyles>
        </MainHeaderDivStyles>
    )
}
