import styled, {css, FlattenInterpolation} from "styled-components";


export type ImageSize = "S" | "L" | "default";


export type ImageProps = {
    size: ImageSize
    isLoading: boolean;
    hasOnClick: boolean;
}

const sizeDivRecord: Record<ImageSize, FlattenInterpolation<any>> = {
    "S": css`
      width: 3em;
      height: 3em;
    `,
    "L": css`
      width: 133px;
      height: 133px;
    `,
    "default": css``
}


export const ImageStyles = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  ${props => sizeDivRecord[props.size]}
  ${props => props.isLoading && css`
    visibility: hidden;
  `}
  ${props => props.hasOnClick && css`
    cursor: pointer;
  `}
`
