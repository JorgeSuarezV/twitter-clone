import styled, {css, FlattenInterpolation} from "styled-components";
import SVG from "react-inlinesvg";

export type IconVariant = "small" | "medium" | "big";

export type IconProps = {
    variant: IconVariant;
}

export type SVGIconProps = IconProps & {
    fill?: string;
}


const IconMap: Record<IconVariant, FlattenInterpolation<any>> = {
    "small": css`
      width: 16px;
      height: 16px;
    `,
    "medium": css`
      width: 24px;
      height: 24px;
    `,
    "big": css`
      width: 2.75em;
      height: 2.75em;
    `
}
export const PNGIconStyle = styled.img<IconProps>`
  ${props => IconMap[props.variant]}
  cursor: pointer;
`

export const SVGIconStyle = styled(SVG)<SVGIconProps>`
  ${props => IconMap[props.variant]}
  fill: ${props => props.fill ?? "unset"};
  cursor: pointer;
`
