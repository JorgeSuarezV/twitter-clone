import styled from "styled-components";
import Header from "../headers/Header";
import {Body} from "../body/Body";
import {Image} from "../image/Image";

export const ProfileDataContainer = styled.div`
  height: 134px;
  width: 568px;
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.outline};
`

export const ProfileImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 400px;
`

export const ProfileTextContainer = styled.div`
  height: 72px;
  width: 235px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const ProfileDataHeader = styled(Header)`
  margin: 0
`

export const ProfileImage = styled(Image)`
  border-radius: 50%;
`

export const ProfileDataBody = styled(Body)`
  margin: 0
`

export const Description = styled(Body)`
  margin-top: 1em;
  margin-bottom: 0;
`