import styled from 'styled-components';
import { byTheme } from 'services/theme';

export const ButtonGroupStyled = styled.div`
  & button:first-child {
    border-radius: 10px 0px 0px 10px;
  }
  & button:last-child {
    border-radius: 0px 10px 10px 0px;
  }
`;

const height = {
  height: {
    normal: 33,
    large: 43,
  },
};

export const ButtonStyled = styled.button.attrs(({ active }) => ({
  className: active ? 'active' : '',
}))`
  border: 1px solid ${props => props.theme.colors.border};
  width: 100px;
  background: transparent;
  color: ${props => props.theme.colors.texts[1]};
  font-size: 16px;
  cursor: pointer;

  ${byTheme(height)}

  &.active {
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    background-image: none;
    background: none;
    box-shadow: none;
  }

  &:focus,
  &:hover,
  &:visited {
    box-shadow: none;
    background: transparent;
    outline: none;
    border-color: ${props => props.theme.colors.border};
  }
`;
