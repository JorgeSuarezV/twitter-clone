import styled from "styled-components";
import SVGIcon from "../../icon/SVGIcon";

export const SideBarItemDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 2.2em;


  @media (max-width: 1400px) {
    justify-content: right;
  }

  @media (max-width: 768px) {
    margin-bottom: unset;
  }
`

export const SideBarIcon = styled(SVGIcon)`
  height: unset;
  width: unset;
  font-size: unset;
    
`

export const SideBarItemLabel = styled.label`
    margin-left: 1.125em;
    font-size: 1.25em;
    cursor: pointer;
    color: ${props => props.theme.colors.text2};

    @media (max-width: 1400px) {
        display: none;
    }
`
