import styled from "styled-components";
import {MainContent} from "../mainLayout/MainLayoutStyles";

export const NoRightSideMainContent = styled(MainContent)`
  flex-grow: 9.35;
  @media (max-width: 1400px) {
    flex-grow: 4;
  }
`