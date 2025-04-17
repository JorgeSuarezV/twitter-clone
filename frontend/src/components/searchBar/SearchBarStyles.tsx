import styled, {css, FlattenInterpolation} from "styled-components";

export type SearchBarSize = "S" | "M" | "variable";

export type SearchBarProps = {
    dimension: SearchBarSize;
}

export const dimensionDivStyles: Record<SearchBarSize, FlattenInterpolation<SearchBarProps>> = {
    S: css`
      width: 360px;
    `,
    M: css`
      width: 35.5em;
    `,
    variable: css`
      width: 100%;
    `
}

export const dimensionInputStyles: Record<SearchBarSize, FlattenInterpolation<SearchBarProps>> = {
    S: css`
      width: 320px;
    `,
    M: css`
        width: 35em;
    `,
    variable: css`
      width: 100%
    `
}

export const SearchAndSuggestionsDiv = styled.div<SearchBarProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1px;
  height: 3.125em;
  ${props => dimensionDivStyles[props.dimension]}
  
  @media (max-width: 768px) {
      width: 100%;
  }
`
export const SearchBarInputStyles = styled.input<SearchBarProps>`
  padding-inline: 1.25em;
  min-height: 3.125em;
  ${props => dimensionInputStyles[props.dimension]}

  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.9375em;
  line-height: 110%;

  /* identical to box height, or 17px */
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;

  border: 1px solid ${props => props.theme.colors.outline};
  background: ${props => props.theme.colors.InactiveBg};

  border-radius: 30px;

  color: ${props => props.theme.colors.text2};
  @media (max-width: 768px) {
    width: calc(100% - 5em);
    margin-right: 1.25em;
    margin-left: 1.25em;
  }

  :focus {
    background: ${props => props.theme.colors.white};
    outline: 1px solid ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.black};
  }
`