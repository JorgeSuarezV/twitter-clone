import styled from "styled-components";
import SearchBar from "../../../components/searchBar/SearchBar";
import {PostCreation} from "../../../components/postCreation/PostCreation";

export const HomeSearchDiv = styled(SearchBar)`
  margin-top: 1em;
  margin-left: 1em;
`

export const HomePostCreation = styled(PostCreation)`
  padding: 1em;
  border-bottom: 1px solid ${props => props.theme.colors.containerLine};
  @media (max-width: 768px) {
    display: none;
  }
`