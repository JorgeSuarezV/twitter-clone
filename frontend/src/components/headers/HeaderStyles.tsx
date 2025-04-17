import styled, {css, StyledComponent} from "styled-components";

export type HeaderVariant = "1" | "2" | "3" | "4" | "5" | "6";

const GenericHeaderStyle = css`
  /* H3 */
  font-family: 'Inter', serif;
  font-style: normal;
  line-height: 110%;
  /* or 35px */
  font-feature-settings: 'pnum' on, 'lnum' on;
  align-items: center;
`;

export const H1 = styled.h1`
  ${() => GenericHeaderStyle}
  font-weight: 700;
  font-size: 3.5em; /* 56px / 16px = 3.5em */
  letter-spacing: -0.015em;
`;

export const H2 = styled.h2`
  ${() => GenericHeaderStyle}
  font-weight: 700;
  font-size: 2.75em; /* 44px / 16px = 2.75em */
  letter-spacing: -0.005em;
`;

export const H3 = styled.h3`
  ${() => GenericHeaderStyle}
  font-weight: 500;
  font-size: 2em; /* 32px / 16px = 2em */
`;

export const H4 = styled.h4`
  ${() => GenericHeaderStyle}
  font-weight: 500;
  font-size: 1.5625em; /* 25px / 16px = 1.5625em */
  letter-spacing: 0.0025em;
`;

export const H5 = styled.h5`
  ${() => GenericHeaderStyle}
  font-weight: 700;
  font-size: 1.25em; /* 20px / 16px = 1.25em */
  letter-spacing: -0.005em;
`;

export const H6 = styled.h6`
  ${() => GenericHeaderStyle}
  font-weight: 500;
  font-size: 1.125em; /* 18px / 16px = 1.125em */
  letter-spacing: 0.0015em;
`;

const HeaderMap: Record<
    HeaderVariant,
    StyledComponent<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", any>
> = {
    "1": H1,
    "2": H2,
    "3": H3,
    "4": H4,
    "5": H5,
    "6": H6,
};

export const HeaderStyle: (
    variant: HeaderVariant
) => StyledComponent<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", any> = (
    variant: HeaderVariant
) => {
    return HeaderMap[variant];
};
