import styled from "styled-components";

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 240px;
  height: 3em;
  justify-content: space-between;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;

  * {
    margin: 0;
  }
`

export const ImageAndTextContainer = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: row;
`