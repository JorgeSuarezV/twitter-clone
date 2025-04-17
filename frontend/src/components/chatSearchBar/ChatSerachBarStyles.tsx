import styled from "styled-components";
import SearchBar from "../searchBar/SearchBar";


export const ChatSearchBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
`

export const ChatSearchBarInput = styled(SearchBar)`
  width: 90%;
`