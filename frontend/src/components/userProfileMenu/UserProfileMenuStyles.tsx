import styled from "styled-components";


export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const OptionsContainer = styled.div`
  position: absolute;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.outline};
  bottom: 60px;
  text-align: left;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  right: 20px;
`

export const LogOutOption = styled.div`
  cursor: pointer;
  width: 304px;
  height: 25px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.outline};
`