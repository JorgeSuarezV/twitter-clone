import styled, {css, FlattenInterpolation} from "styled-components";


export type TabProps = {
    isActive: TabActiveProps;
}

export type TabActiveProps = "true" | "false"

const tabActiveRecord: Record<TabActiveProps, FlattenInterpolation<any>> = {
    "true": css`
        border-bottom: 2px solid ${props => props.theme.colors.main};
        color: ${props => props.theme.colors.black};
    `,
    "false": css`
      color: ${props => props.theme.colors.text2};
    `
}

export const TabStyles = styled.div<TabProps>`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Manrope, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
  letter-spacing: -0.15px;
  ${props => tabActiveRecord[props.isActive]}
`