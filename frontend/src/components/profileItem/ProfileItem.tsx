import React, {ReactNode} from "react";
import {ProfileItemContainerStyles, ProfileItemStyles} from "./ProfileItemStyles";

export type ProfileItemProps = {
    className?: string;
    children: ReactNode;
    onClick?: (ClickEvent: React.MouseEvent<HTMLDivElement>) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export function ProfileItem({className, children, onClick, innerRef}: ProfileItemProps) {
    return (
        <ProfileItemContainerStyles ref={innerRef}>
            <ProfileItemStyles className={className} onClick={onClick}>
                {children}
            </ProfileItemStyles>
        </ProfileItemContainerStyles>
    )
}