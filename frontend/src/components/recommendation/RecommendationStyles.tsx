import styled from "styled-components";
import {Body} from "../body/Body";
import Header from "../headers/Header";
import {FollowButton} from "../followButton/FollowButton";

export const RecommendationDivStyles = styled.div`
  margin-top: 1em;
  margin-left: 1em;
  border-radius: 16px;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  background-color: ${props => props.theme.colors.inactiveBg};
`


export const RecommendationTitleDivStyles = styled.div`
  width: 100%;
  height: 3em;
`

export const RecommendationItemButton = styled(FollowButton)`
  margin-right: 1em;
`

export const TextButtonDivStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const RecommendationTitleStyles = styled(Header)`
  margin-left: 1em;
  margin-top: 1em
`

export const RecommendationFooterStyles = styled.div`
  width: 100%;
`
export const RecommendationFooterTextStyles = styled(Body)`
  margin-top: 1em;
  margin-left: 1em;
  margin-bottom: 1em;
  cursor: pointer;

  color: ${props => props.theme.colors.main};
`
