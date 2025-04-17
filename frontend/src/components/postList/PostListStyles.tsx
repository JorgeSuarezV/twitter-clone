import styled from "styled-components";

export const PostListContainerStyles = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  flex: 1;


  > * {
    border-bottom: 1px solid ${props => props.theme.colors.containerLine};
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 3.5em;
  width: auto;
`