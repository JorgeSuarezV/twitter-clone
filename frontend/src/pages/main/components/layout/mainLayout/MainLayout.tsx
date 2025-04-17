import LeftSideBar from "../../../../../components/sidebar/SideBar";
import React from "react";
import {MainContent, RightSideBar} from "./MainLayoutStyles";
import {MainRecommendation} from "../../mainRecommendation/MainRecommendation";
import {MainBackGroundStyles, MainBigFrameStyles} from "../../MainBackground";
import {HomeSearchDiv} from "../../../home/HomeStyles";
import {useWindowSize} from "../../../../../util/hooks";
import {useNavigate} from "react-router-dom";


export type MainLayoutProps = {
    title?: string;
    children: React.ReactNode;
    isScrollable?: boolean;
}

export default function MainLayout({title, children, isScrollable}: MainLayoutProps) {
    const navigate = useNavigate()

    return (
        <MainBackGroundStyles>
            <LeftSideBar/>
            <MainContent>
                <MainBigFrameStyles title={title} isScrollable={isScrollable}>
                    {children}
                </MainBigFrameStyles>
                <RightSideBar>
                    <HomeSearchDiv suggestionOnClick={(userId) => navigate(`/profile/${userId}`)} size={"S"}/>
                    <MainRecommendation/>
                </RightSideBar>
            </MainContent>
        </MainBackGroundStyles>
    )
}