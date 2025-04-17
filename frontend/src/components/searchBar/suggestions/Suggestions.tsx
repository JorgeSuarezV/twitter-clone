import React, {useEffect} from "react";
import {SuggestionDivStyles, SuggestionItemStyles} from "./SuggestionStyles";
import {useNavigate} from "react-router-dom";
import {ProfileItemImage} from "../../profileItem/profileItemImage/ProfileItemImage";
import {ProfileItemText} from "../../profileItem/profileItemText/ProfileItemText";
import {searchRequest} from "../../../server/UserRequests";
import {SearchBarSize} from "../SearchBarStyles";


export type SearchBarSuggestionProps = {
    className?: string;
    searchedValue: string;
    size: SearchBarSize
    suggestionOnClick: (userId: string) => void;
}

export default function SearchBarSuggestion({className, searchedValue, size, suggestionOnClick}: SearchBarSuggestionProps) {
    const [suggestions, setSuggestions] = React.useState([]);


    useEffect(() => {
        lookForSuggestions()
    }, [searchedValue])

    function lookForSuggestions() {
        if (searchedValue === "") {
            setSuggestions([])
            return;
        }
        searchRequest(searchedValue)
            .then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            setSuggestions(data)
                        })
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
    }

    function generateSuggestions(data: any) {
        return data.map((user: any) => {
            return (
                <SuggestionItemStyles
                    key={user.id}
                    onClick={() => suggestionOnClick(user.id)}
                >
                    <ProfileItemImage profilePicture={user.profilePicture}/>
                    <ProfileItemText name={user.name} username={user.username}/>
                </SuggestionItemStyles>
            )
        })

    }

    return (
        <SuggestionDivStyles dimension={size} className={className}>
            {generateSuggestions(suggestions)}
        </SuggestionDivStyles>
    )
}