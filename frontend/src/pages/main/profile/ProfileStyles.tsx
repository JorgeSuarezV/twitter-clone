import styled from "styled-components";
import {Body} from "../../../components/body/Body";
import Header from "../../../components/headers/Header";
import {Image} from "../../../components/image/Image";

export const ProfileDataContainer = styled.div`
  height: 134px;
  width: 568px;
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.containerLine};

  @media (max-width: 768px) {
    width: auto;
  }
`

export const ProfileImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
  @media (max-width: 768px) {
    width: auto;
  }
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