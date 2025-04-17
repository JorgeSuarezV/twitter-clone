import styled from "styled-components";


export const MainContent = styled.div`
  display: flex;
  flex-grow: 4;
  @media (max-width: 768px) {
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
  }
`

export const RightSideBar = styled.div`
  @media (max-width: 1080px) {
    display: none;
  }
`

