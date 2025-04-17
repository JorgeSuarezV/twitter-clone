import styled from "styled-components";
import {ButtonsDivStyle, ErrorBody, ErrorLIStyle, ErrorULStyle, FormDivStyle, TitleDivStyle,} from "../AuthStyles";

export const LoginTitle = styled(TitleDivStyle)`
  top: 7.875em; /* 126px / 16px = 7.875em */
`;

export const LoginFormDiv = styled(FormDivStyle)`
  top: 11.5625em; /* 185px / 16px = 11.5625em */
`;

export const LoginButtonsDiv = styled(ButtonsDivStyle)`
  top: 37em; /* 592px / 16px = 37em */
`;

export const LoginErrorBody = styled(ErrorBody)`
`;

export const LoginErrorDiv = styled.div`
  position: absolute;
  top: 22em;
  display: flex;
  justify-content: center;
  width: 100%;
`

export const LoginErrorULStyle = styled(ErrorULStyle)`
  top: 22.5em; /* 360px / 16px = 22.5em */
  
`;

export const LoginErrorLIStyle = styled(ErrorLIStyle)`
  position: relative;
`;
