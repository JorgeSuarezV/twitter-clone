import styled, {css, FlattenInterpolation} from "styled-components";


export type BodyBoldVariant = "Normal" | "Bold";

export type BodyVariant = "1" | "2";

export type BodyStyleProps = {
    variant: BodyVariant
    boldVariant: BodyBoldVariant
    color?: string
}


const boldVariantRecord: Record<BodyBoldVariant, FlattenInterpolation<any>> = {
    "Normal": css`
      font-weight: 400;
      font-feature-settings: 'tnum' on, 'lnum' on;
    `,
    "Bold": css`
      font-weight: 600;
      font-feature-settings: 'pnum' on, 'lnum' on;;
    `
}

const bodyVariantRecord: Record<BodyVariant, FlattenInterpolation<any>> = {
    "1": css`
      font-size: 16px;
    `,
    "2": css`
      font-size: 14px;
      letter-spacing: 0.0025em;
    `
}


export const BodyStyles = styled.p<BodyStyleProps>`
  font-family: 'Inter', serif;
  font-style: normal;
  line-height: 110%;

  /* or 15px */
  display: flex;
  align-items: center;

  /* Inside auto layout */
  flex: none;
  flex-grow: 0;


  /* Grayscale/Black */
  color: ${props => props.color ? props.color : props.theme.colors.black};

  ${props => bodyVariantRecord[props.variant]}
  ${props => boldVariantRecord[props.boldVariant]}
`
