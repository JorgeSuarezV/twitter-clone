import React from "react";
import {ChatSearchBarDiv, ChatSearchBarInput} from "./ChatSerachBarStyles";
import {useTranslation} from "react-i18next";


export function ChatSearchBar() {
    const [t] = useTranslation()

    return (
        <ChatSearchBarDiv>
            <ChatSearchBarInput suggestionOnClick={() => {/*TODO*/}} size={"variable"} placeholder={t("Search Direct Messages")}/>
        </ChatSearchBarDiv>
)
}
