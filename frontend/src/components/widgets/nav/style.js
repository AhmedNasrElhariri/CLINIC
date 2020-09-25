import styled, { css } from 'styled-components';
import { layout } from 'styled-system';

import { Div } from 'components/widgets';

const activeStyles = css`
  background-color: #ffffff;
  cursor: auto;
  border-bottom: 4px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  font-weight: 800;
`;

export const ItemStyled = styled(Div)`
  /* width: 150px; */
  height: 80px;
  font-size: 20px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.colors.texts[2]};

  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px 17px 0px 0px;
  border: none;
  cursor: pointer;

  ${props => (props.active ? activeStyles : '')}
  ${layout}
`;
