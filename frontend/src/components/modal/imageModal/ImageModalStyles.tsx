import styled from "styled-components";
import {Image} from "../../image/Image"


export const ImageModalBackgroundStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 10;
`

export const ImageContainer = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ModalImage = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`