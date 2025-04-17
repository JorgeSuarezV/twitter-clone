import styled from "styled-components";
import {FieldStatus} from "./Field";

export type FieldStyleProps = {
    status: FieldStatus;
}

export type FieldLabelStyleProps = {
    status: FieldStatus;
}

export type FieldInputStyleProps = {
    status: FieldStatus;
}
export const FieldStyle = styled.div<FieldStyleProps>`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  //width: 80%;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 15px;
  gap: 4px;
  height: 70px;


  /* Grayscale/White */
  //background: #FFFFFF;

  /* Grayscale/outline */
  border-radius: 8px;
  transition: 0.3s;
  

  ${(props) => {
    switch (props.status) {
        case FieldStatus.Default:
            return `
          width: 80%;
          border: 1px solid ${props.theme.colors.outline};
          background: ${props.theme.colors.white};
        `
        case FieldStatus.Focused:
            return `
          width: 100%;
          border: 1px solid ${props.theme.colors.main};
          background: ${props.theme.colors.white};
        `
        case FieldStatus.Disabled:
            return `
          width: 90%;
          border: 1px solid ${props.theme.colors.outline};
          background: ${props.theme.colors.InactiveBg};
        `
        case FieldStatus.Error:
            return `
          width: 100%;
          border: 1px solid ${props.theme.colors.error};
          background: ${props.theme.colors.white};
        `
    }
}}
`

export const FieldLabelStyle = styled.label<FieldLabelStyleProps>`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 110%;

  /* identical to box height, or 17px */
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;
  /* Grayscale/text2 */

  ${(props) => {
    switch (props.status) {
        case FieldStatus.Default:
            return `
          color: ${props.theme.colors.text2};
        `;
        case FieldStatus.Focused:
            return `
          color: ${props.theme.colors.main};
        `;
        case FieldStatus.Disabled:
            return `
          color: ${props.theme.colors.text2};
        `;
        case FieldStatus.Error:
            return `
          color: ${props.theme.colors.error};
        `;
    }
}}
`;


export const FieldInputStyle = styled.input<FieldInputStyleProps>`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 110%;
  width: 100%;

  /* identical to box height, or 17px */
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;

  /* Grayscale/text2 */
  color: ${props => props.theme.colors.text2};
  background: ${props => props.theme.colors.white};
  
  border: none;
  outline: none;

  ${(props) => {
    switch (props.status) {
        case FieldStatus.Default:
            return `
          color: ${props.theme.colors.text2};
          `
        case FieldStatus.Focused:
            return `
          color: ${props.theme.colors.main};
          `
        case FieldStatus.Disabled:
            return `
          color: ${props.theme.colors.text2};
          `
        case FieldStatus.Error:
            return `
          color: ${props.theme.colors.error};
          `
    }
}}
`