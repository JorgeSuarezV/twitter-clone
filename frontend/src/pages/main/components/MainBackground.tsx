import {BackgroundStyles} from "../../../components/frame/BackgroundStyles";
import styled from "styled-components";
import {BigFrame} from "../../../components/bigFrame/BigFrame";

export const MainBackGroundStyles = styled(BackgroundStyles)`
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

export const MainBigFrameStyles = styled(BigFrame)`
  display: flex;
  flex-direction: column;
`
