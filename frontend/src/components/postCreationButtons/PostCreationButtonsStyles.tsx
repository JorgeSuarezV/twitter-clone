import styled from "styled-components";
import SVGIcon from "../icon/SVGIcon";
import Button from "../button/Button";

export type PostCreationButtonsProps = {
    hasLine?: boolean
}

export const ButtonsContainer = styled.div<PostCreationButtonsProps>`
  display: flex;
  flex-direction: row;
  align-items: end;
  height: 34px;
  justify-content: space-between;
  padding-top: 8px;
  border-top: ${props => props.hasLine ? `1px solid ${props.theme.colors.containerLine}` : "none"};
`


export const LoadImageIcon = styled(SVGIcon)`
  padding: 0.5em;
`

export const TweetButton = styled(Button)`
  @media (max-width: 768px) {
    display: none;
  }
`