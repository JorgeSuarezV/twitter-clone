import styled, {css, FlattenInterpolation} from "styled-components";

export type SubtitleVariant = "1" | "2";

export type SubtitleStylesProps = {
    variant: SubtitleVariant;
}


const variantRecord: Record<SubtitleVariant, FlattenInterpolation<any>> = {
    "1": css`
      font-size: 1.125em;
      letter-spacing: 0.0015em;
    `,
    "2": css`
      font-size: 1em;
      letter-spacing: 0.001em;
    `
}

export const SubtitleStyles = styled.sub<SubtitleStylesProps>`
  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 300;
  line-height: 110%;

  /* identical to box height, or 20px */
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;

  /* Grayscale/Black */
  color: ${props => props.theme.colors.black};
  
  ${(props) => {
    return variantRecord[props.variant];
}}
`