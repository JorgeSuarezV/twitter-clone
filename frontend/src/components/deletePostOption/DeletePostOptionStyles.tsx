import styled from "styled-components";

export const DeleteButton = styled.button`
  display: inline-flex;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  box-shadow: 0px 0px 19px -3px rgba(0, 0, 0, 0.25);
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.error};
  border: none;
  font-family: Manrope, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%;
  letter-spacing: -0.15px;
  cursor: pointer;
`