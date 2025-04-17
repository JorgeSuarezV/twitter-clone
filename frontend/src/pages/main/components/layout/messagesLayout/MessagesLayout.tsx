import React from "react";
import {MainBackGroundStyles, MainBigFrameStyles} from "../../MainBackground";
import LeftSideBar from "../../../../../components/sidebar/SideBar";
import {MainContent} from "../mainLayout/MainLayoutStyles";
import {useWindowSize} from "../../../../../util/hooks";

export type MessagesLayoutProps = {
    MainContentChildren: React.ReactNode;
    RightSide: React.ReactNode;
}

export function MessagesLayout({MainContentChildren, RightSide}: MessagesLayoutProps) {
    const window = useWindowSize()

    return (
        <MainBackGroundStyles>
            <LeftSideBar/>
            <MainContent>
                <MainBigFrameStyles title={"Messages"} isScrollable={true}>
                    {MainContentChildren}
                </MainBigFrameStyles>
                {RightSide}
            </MainContent>
        </MainBackGroundStyles>
    )
}