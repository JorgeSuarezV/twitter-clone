import styled from "styled-components";
import Button from "../button/Button";


export const PostCreationContainer = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: space-between;
`

export const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 100%;
`

export const MobileTweetButton = styled(Button)`
  @media (min-width: 768px) {
    display: none;
  }
`

export const PostCreationInput = styled.input`
  border: none;
  width: calc(100% - 48px);
  display: block;

  :focus {
    outline: none;
  }

  word-break: break-word;
  font-family: Inter, sans-serif;
  font-size: 18px;
  height: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  letter-spacing: 0.027px;
`


export const ImagesContainer = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
  height: fit-content;
  padding-left: 56px;
`