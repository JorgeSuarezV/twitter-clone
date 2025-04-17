import styled from "styled-components";
import Button from "../button/Button";
import {PostCreationModal} from "../postCreationModal/PostCreationModal";


export const SideBarDiv = styled.div`
  position: fixed;
  width: 300px;
  margin-right: 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;


  @media (max-width: 1400px) {
    width: 4em;
  }

  @media (max-width: 768px) {
    margin-right: unset;
    width: 100%;
  }
`

export const SideBarTwitterIconDiv = styled.div`
  display: flex;
  margin-top: 1em;
  @media (max-width: 1400px) {
    justify-content: right;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

export const SideBarItemsDiv = styled.div`
  margin-top: 2.2em;

  @media (max-width: 768px) {
    margin-top: unset;
    align-items: center;
    position: relative;
    width: 100%;
    height: 50px;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

export const TweetButton = styled(Button)`
  width: 300px;

  @media (max-width: 1400px) {
    display: none;
  }
`

export const PostCreationModalStyles = styled(PostCreationModal)`
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    max-width: unset;
    border-radius: 0;
    height: 100%;
    position: absolute;
  }
`


export const TweetButtonMobile = styled.button`
  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 768px) {
    z-index: 2;
    position: absolute;
    bottom: 80px;
    right: 16px;
    border-radius: 50%;
    border: none;
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.white};
    text-align: center;
    font-family: Manrope, sans-serif;
    font-size: 30px;
    font-style: normal;
    text-justify: auto;
    cursor: pointer;
    font-weight: 800;
    line-height: 110%; /* 39.6px */
    letter-spacing: -0.36px;
    text-transform: capitalize;
    width: 50px;
    height: 50px;
  }
`

export const WrapperSideBarDiv = styled.div`
  flex-grow: 4;
  width: 24em;
  display: flex;
  justify-content: right;

  @media (max-width: 1400px) {
    width: 4em;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-height: 50px;
    height: 50px;
    // box shadow on top doesn't work
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    border-top: 1px solid ${props => props.theme.colors.outline};
    background-color: ${props => props.theme.colors.white};
  }
`

export const TopSideBar = styled.div`
  > * {
    margin-bottom: 0.5em;
  }
`

export const BottomSideBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
  justify-content: flex-end;
`



