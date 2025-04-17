import styled from "styled-components";
import {Modal} from "../modal/Modal";
import {PostCreation} from "../postCreation/PostCreation";


export const PostCreationModalStyles = styled(Modal)`
  padding: 16px;
  max-width: 528px;
  height: fit-content;
  min-height: 210px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ModalHeaderStyles = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-between;
`

export const PostCreationStyles = styled(PostCreation)`
  padding: 16px;
  min-height: 160px;
`