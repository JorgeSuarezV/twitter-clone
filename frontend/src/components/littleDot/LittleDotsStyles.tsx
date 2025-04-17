import styled from "styled-components";

export type LittleDotProps = {
    color?: string;
}

export type LittleDotsProps = {
    displayDots: boolean;
}

export const LittleDotStyle = styled.div<LittleDotProps>`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${props => props.color ? props.color : props.theme.colors.text2};
`

export const DotsContainer = styled.div<LittleDotsProps>`
  height: 40px;
  width: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: ${props => props.displayDots ? "flex" : "none"};

  > * {
    margin-right: 6px;
  }
`

export const OptionsContainer = styled.div`
  position: inherit;
`