import React from "react";
import {LogOutOption, MenuContainer, OptionsContainer} from "./UserProfileMenuStyles";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "../../util/hooks";
import {ChangeLanguageOption} from "../changeLanguageOption/ChangeLanguageOption";
import {LogOutModal} from "../logoutModal/LogOutModal";


export function UserProfileMenu() {
    const [t] = useTranslation()
    const user = useAppSelector((state: any) => state.activeUser);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    return (
        <>
            <LogOutModal active={openModal} cancelCallback={() => setOpenModal(false)}/>
            <MenuContainer>
                <OptionsContainer>
                    <LogOutOption
                        onClick={() => setOpenModal(true)}>{t("Log out") + ` @${user.username}`}</LogOutOption>
                    <ChangeLanguageOption/>
                </OptionsContainer>
            </MenuContainer>
        </>

    )
}
