import styled from "styled-components";
import {Body} from "../body/Body";


export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px;
  gap: 16px;
`

export const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  display-direction: row;

  > * {
    margin-right: 8px;
  }
`

export const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 56px;
  gap: 16px;
`

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const PostBody = styled(Body)`
  margin-top: 0;
  margin-bottom: 0;
`
