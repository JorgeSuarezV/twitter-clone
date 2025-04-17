import styled from "styled-components";
import {Subtitle} from "../../subtitle/Subtitle";
import {Body} from "../../body/Body";

export const ProfileItemTextStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const SuggestionTitleStyles = styled(Body)`
  cursor: pointer;
  position: relative;
  bottom: 0.5em;
`

export const SuggestionSubtitleStyles = styled(Subtitle)`
  cursor: pointer;
  position: relative;
  bottom: 1em;
`