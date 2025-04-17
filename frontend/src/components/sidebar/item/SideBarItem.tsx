import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {SideBarIcon, SideBarItemDiv, SideBarItemLabel} from "./SideBarItemStyles";
import {DefaultTheme, useTheme} from "styled-components";
import {Theme} from "../../../Theme";

export type SideBarItemProps = {
    children: string;
    activePath: string;
    mainIcon: string;
    altIcon: string;
    onClick?: () => void;
}

export default function SideBarItem({children, activePath, mainIcon, altIcon}: SideBarItemProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const icon = location.pathname.includes(activePath) ? mainIcon : altIcon;
    const theme: Theme = useTheme() as Theme

    return (
        <SideBarItemDiv onClick={() => navigate(activePath)}>
            <SideBarIcon variant={"medium"} fill={theme.colors.white} src={icon}></SideBarIcon>
            <SideBarItemLabel>{children}</SideBarItemLabel>
        </SideBarItemDiv>
    )
}
