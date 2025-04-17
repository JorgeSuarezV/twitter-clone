import styled from "styled-components";

export const ProfileItemStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 16px;
  width: 100%;
`


export const ProfileItemContainerStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  align-items: center;

  :hover {
    background: ${props => props.theme.colors.InactiveBg};
    border-radius: 0;
  }
`



