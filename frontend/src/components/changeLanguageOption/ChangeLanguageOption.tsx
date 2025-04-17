import React from "react";
import i18n from "i18next";
import {ChangeLanguageOptionContainer, RoundedSlider, StyledSwitch, SwitchInput} from "./ChangeLanguageOptionStyles";


export function ChangeLanguageOption() {
    const [language, setLanguage] = React.useState<string>(i18n.language);

    function changeLanguage() {
        i18n.changeLanguage(language === "en" ? "es" : "en").then(r => setLanguage(i18n.language));
    }


    return (
        <ChangeLanguageOptionContainer>
            {language}
            <StyledSwitch>
                <SwitchInput type="checkbox" checked={language === "es"} onChange={() => {}} onInput={changeLanguage}/>
                <RoundedSlider/>
            </StyledSwitch>
        </ChangeLanguageOptionContainer>
    )
}