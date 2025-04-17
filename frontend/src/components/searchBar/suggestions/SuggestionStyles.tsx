import styled from "styled-components";
import {ProfileItem} from "../../profileItem/ProfileItem";
import {dimensionDivStyles, SearchBarProps} from "../SearchBarStyles";

export const SuggestionDivStyles = styled.div<SearchBarProps>`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${props => dimensionDivStyles[props.dimension]}


  /* Grayscale/White */
  background: ${props => props.theme.colors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  @media (max-width: 768px) {
    width: calc(100% - 2.5em);
    margin-right: 1.25em;
    margin-left: 1.25em;
  }
`

export const SuggestionItemStyles = styled(ProfileItem)`
  margin-left: 1em;
  cursor: pointer;
`
