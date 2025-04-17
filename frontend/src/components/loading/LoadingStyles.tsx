import styled, {css, FlattenInterpolation} from "styled-components";

export type LoadingSize = "S" | "L" | "default";

export type LoadingStyleProps = {
    size: LoadingSize;
}


const sizeLoadingRecord: Record<LoadingSize, FlattenInterpolation<any>> = {
    "S": css`
      border: 0.3em solid ${props => props.theme.colors.white}; /* 20px -> 0.3em */
      border-top: 0.3em solid ${props => props.theme.colors.main}; /* 20px -> 0.3em */
      width: 2em; /* 200px -> 2em */
      height: 2em; /* 200px -> 2em */
    `,
    "L": css`
      border: 0.5em solid ${props => props.theme.colors.white};
      border-top: 0.5em solid ${props => props.theme.colors.main};
      width: 7em;
      height: 7em;
    `,
    "default": css`
      ${() => sizeLoadingRecord["S"]}
    `
}


export const LoadingStyles = styled.div<LoadingStyleProps>`
  border-radius: 50%;
  ${props => sizeLoadingRecord[props.size]}
  animation: spinner 2s linear infinite;
  @keyframes spinner {
    10% {
      transform: rotate(45deg);
    }
    65% {
      transform: rotate(340deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`