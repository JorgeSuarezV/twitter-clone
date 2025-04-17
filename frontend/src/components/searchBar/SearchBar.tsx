import React, {useState} from "react";
import SearchBarSuggestion from "./suggestions/Suggestions";
import {SearchAndSuggestionsDiv, SearchBarInputStyles, SearchBarSize} from "./SearchBarStyles";
import {useTranslation} from "react-i18next";

export type SearchBarProps = {
    className?: string;
    size: SearchBarSize;
    placeholder?: string;
    suggestionOnClick: (userId: string) => void;
}

export default function SearchBar({className, size, placeholder, suggestionOnClick}: SearchBarProps) {
    const [t] = useTranslation();
    const [searchedValue, setSearchedValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <SearchAndSuggestionsDiv className={className} dimension={size}>
            <SearchBarInputStyles dimension={size}
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                      setSearchedValue(event.target.value)
                                  }}
                                  onFocus={() => {
                                      setIsFocused(true)
                                  }}
                                  onBlur={() => {
                                      setIsFocused(true)
                                  }}
                                  value={searchedValue} placeholder={placeholder ?? t("Search")}/>
            {isFocused && <SearchBarSuggestion suggestionOnClick={suggestionOnClick} size={size} searchedValue={searchedValue}/>}
        </SearchAndSuggestionsDiv>
    )
}
