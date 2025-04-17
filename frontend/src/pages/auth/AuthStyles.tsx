import styled, {css} from "styled-components";
import {BigFrameStyle} from "../../components/frame/Frame";

export const IconDivStyle = styled.div`
  position: absolute;
  top: 2.5em;
  padding: 5.625em;
  transform: translate(0, -50%);
  background: ${props => props.theme.colors.white};
`

export const TitleDivStyle = styled.div`
  position: absolute;
  transform: translate(0, -50%);
  background: ${props => props.theme.colors.white};
`

export const FormDivStyle = styled.div`
  width: 70%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  top: 11.5625em; /* 185px / 16px = 11.5625em */
  position: relative;

  > * {
    margin-bottom: 0.5em;
  }
`

export const AuthBigFrameStyles = styled(BigFrameStyle)`
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: auto;
`

export const ButtonsDivStyle = styled.div`
  position: absolute;

  > * {
    margin-bottom: 0.5em;
  }
`

export const errorCSS = css`
  position: absolute;
  color: ${props => props.theme.colors.error};
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  font-size: 12px;
  line-height: 110%;

  /* or 13px */
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;
`

export const ErrorBody = styled.body`
  ${() => errorCSS}
`

export const ErrorULStyle = styled.ul`
  ${() => errorCSS}
`

export const ErrorLIStyle = styled.li`
  ${() => errorCSS}
`