import React from "react";
import SVGIcon from "../icon/SVGIcon";
import {ReactionContainer, ReactionCount} from "./ReactionStyles";

export type ReactionProps = {
    icon: string
    onClick?: () => void;
    count: number
    fill?: string
}

export function Reaction({icon, onClick, count, fill}: ReactionProps) {

    return (
        <ReactionContainer>
            <SVGIcon fill={fill} variant={"small"} src={icon} onClick={onClick}/>
            <ReactionCount variant={"1"}>{count}</ReactionCount>
        </ReactionContainer>
    )
}