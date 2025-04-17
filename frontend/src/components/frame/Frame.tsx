import styled from "styled-components";

export const BigFrameStyle = styled.div`
  box-sizing: border-box;
  top: 0;
  text-align: center;
  width: 37.5em;
  height: 100%;


  /* Grayscale/Container Line */
  border-width: 0 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.containerLine};
  background: ${props => props.theme.colors.white};


  @media (max-width: 768px) {
    width: 100%;
  }
`

export type InnerBigFrameProps = {
    isScrollable?: boolean;
}

export const InnerBigFrame = styled.div<InnerBigFrameProps>`
  height: 100%;
  width: inherit;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: ${props => props.isScrollable ? "auto" : "hidden"};

  > * {
    height: 100%;
  }
`