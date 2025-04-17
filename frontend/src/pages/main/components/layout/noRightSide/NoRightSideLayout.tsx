import React from "react";
import LeftSideBar from "../../../../../components/sidebar/SideBar";
import {NoRightSideMainContent} from "./NoRightSideLayoutStyles";
import {MainBackGroundStyles, MainBigFrameStyles} from "../../MainBackground";

export type NoRightSideLayoutProps = {
    title?: string;
    children: React.ReactNode
    isScrollable?: boolean;
}

export function NoRightSideLayout({title, children, isScrollable}: NoRightSideLayoutProps) {

    return (
        <MainBackGroundStyles>
            <LeftSideBar/>
            <NoRightSideMainContent>
                <MainBigFrameStyles title={title} isScrollable={isScrollable}>
                    {children}
                </MainBigFrameStyles>
            </NoRightSideMainContent>
        </MainBackGroundStyles>
    )
}