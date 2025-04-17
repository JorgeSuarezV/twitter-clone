import styled from "styled-components";

export const ChangeLanguageOptionContainer = styled.div`
  width: 304px;
  height: 25px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;

  :before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }
`;

export const RoundedSlider = styled(Slider)`
  border-radius: 34px;
`;

export const StyledSwitch = styled(Switch)`
  input:checked + ${Slider} {
    background-color: ${props => props.theme.colors.main};
  }

  input:checked + ${Slider}:before {
    border-radius: 50%;
    transform: translateX(26px);
  }

  ${Slider}:before {
    border-radius: 50%;
  }

`;






