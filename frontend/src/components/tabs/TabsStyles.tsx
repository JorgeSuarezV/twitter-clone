import styled from "styled-components";

export const TabsContainer = styled.div`
  height: 57px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.containerLine};
`;

export const ContentContainer = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;