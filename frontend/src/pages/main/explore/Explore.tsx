import React from "react";
import {NoRightSideLayout} from "../components/layout/noRightSide/NoRightSideLayout";
import SearchBar from "../../../components/searchBar/SearchBar";
import {SearchBarContainer} from "./ExploreStyles";
import {useNavigate} from "react-router-dom";


export function Explore() {
    const navigate = useNavigate()

    return (
        <NoRightSideLayout>
            <SearchBarContainer>
                <SearchBar suggestionOnClick={(userId) => navigate(`/profile/${userId}`)} size={"M"}/>
            </SearchBarContainer>
        </NoRightSideLayout>
    )
}