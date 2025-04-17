import React, {ReactNode} from "react";
import {
    BottomSideBar,
    PostCreationModalStyles,
    SideBarDiv,
    SideBarItemsDiv,
    SideBarTwitterIconDiv,
    TopSideBar,
    TweetButton,
    TweetButtonMobile,
    WrapperSideBarDiv
} from "./SideBarStyles";
import icon from "../../assets/icon.png";
import homeIcon from "../../assets/Home.svg";
import boldHomeIcon from "../../assets/HomeBold.svg";
import exploreIcon from "../../assets/Explore.svg";
import boldExploreIcon from "../../assets/ExploreBold.svg";
import message from "../../assets/Message.svg";
import boldMessage from "../../assets/MessageBold.svg";
import profile from "../../assets/Profile.svg";
import boldProfile from "../../assets/ProfileBold.svg";
import SideBarItem from "./item/SideBarItem";
import {useAppSelector, useWindowSize} from "../../util/hooks";
import {PNGIconStyle} from "../icon/IconStyles";
import {useTranslation} from "react-i18next";
import leftArrow from "../../assets/LeftArrow.svg";
import cancel from "../../assets/Cancel.svg";
import {UserProfile} from "../userProfile/UserProfile";


export type SideBarProps = {
    items?: ReactNode;
}

export default function SideBar({items}: SideBarProps) {
    const user = useAppSelector((state: any) => state.activeUser);
    const [tweetModalOpen, setTweetModalOpen] = React.useState(false);
    const [t] = useTranslation()
    const window = useWindowSize()

    if (!items) {
        items = (
            <>
                <SideBarItem activePath={"/feed"} mainIcon={boldHomeIcon} altIcon={homeIcon}>{t("Home")}</SideBarItem>
                <SideBarItem activePath={"/explore"} mainIcon={boldExploreIcon}
                             altIcon={exploreIcon}>{t("Explore")}</SideBarItem>
                <SideBarItem activePath={"/messages"} mainIcon={boldMessage}
                             altIcon={message}>{t("Messages")}</SideBarItem>
                <SideBarItem activePath={`/profile/${user.id}`} mainIcon={boldProfile}
                             altIcon={profile}>{t("Profile")}</SideBarItem>
            </>
        )
    }

    return (
        <>
            <PostCreationModalStyles active={tweetModalOpen} onPostCreation={() => setTweetModalOpen(false)}
                                     onCancel={() => setTweetModalOpen(false)}
                                     cancelIcon={window[0] < 768 ? leftArrow : cancel}/>
            <WrapperSideBarDiv>
                <TweetButtonMobile onClick={() => setTweetModalOpen(true)}>+</TweetButtonMobile>
                <SideBarDiv>
                    <TopSideBar>
                        <SideBarTwitterIconDiv>
                            <PNGIconStyle variant={"medium"} src={icon}></PNGIconStyle>
                        </SideBarTwitterIconDiv>
                        <SideBarItemsDiv>
                            {items}
                        </SideBarItemsDiv>
                        <TweetButton
                            variant={"default"} size={"M"}
                            onClick={() => {
                                setTweetModalOpen(true)
                            }}>Tweet
                        </TweetButton>
                    </TopSideBar>
                    <BottomSideBar>
                        <UserProfile/>
                    </BottomSideBar>
                </SideBarDiv>
            </WrapperSideBarDiv>
        </>


    )
}
