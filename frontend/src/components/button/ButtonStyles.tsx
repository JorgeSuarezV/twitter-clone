import styled, {css, FlattenInterpolation} from "styled-components";

export type ButtonVariant = "default" | "follow" | "delete" | "outlined";
export type ButtonSize = "S" | "M" | "L";

export type ButtonStyleProps = {
    variant: ButtonVariant;
    size: ButtonSize;
};

const sizeRecord: Record<ButtonSize, string> = {
    S: "82px", // 82px / 16px = 5.125em
    M: "210px", // 210px / 16px = 13.125em
    L: "434px", // 439px / 16px = 27.4375em
};

const variantRecord: Record<ButtonVariant, FlattenInterpolation<any>> = {
    default: css`
      background: ${(props) => props.theme.colors.main};

      :hover {
        background: ${(props) => props.theme.colors.dark};
      }

      :disabled {
        background: ${(props) => props.theme.colors.light};
        cursor: unset;
      }
    `,
    follow: css`
      background: ${(props) => props.theme.colors.black};
    `,
    delete: css`
      background: ${(props) => props.theme.colors.error};
    `,
    outlined: css`
      color: ${(props) => props.theme.colors.black};
      background: ${(props) => props.theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors.outline};
    `,
};

export const ButtonStyle = styled.button<ButtonStyleProps>`
  /* Button */
  font-family: 'Manrope', serif;
  font-style: normal;
  font-weight: 800;
  font-size: 0.9375em; /* 15px / 16px = 0.9375em */
  line-height: 110%;
  /* button font color */
  color: ${(props) => props.theme.colors.white};

  /* identical to box height, or 17px */

  display: flex;
  align-items: center;
  justify-content: center; /* Center the content horizontally */
  text-align: center;
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;
  border-radius: 2.5em; /* 40px / 16px = 2.5em */

  flex-direction: row;
  gap: 0.5em; /* 8px / 16px = 0.5em */
  border: none;
  height: 2.0625em; /* 33px / 16px = 2.0625em */
  cursor: pointer;

  ${(props) => `width: ${sizeRecord[props.size]};`}

  ${(props) => {
    if (props.size === "L") {
        return variantRecord["default"]; // default variant for large buttons
    }

    return variantRecord[props.variant];
}}
`;
