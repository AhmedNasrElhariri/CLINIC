import styled, { css } from 'styled-components';

import { Div } from 'components/widgets';

const activeStyles = css`
  background-color: #ffffff;
  cursor: auto;
  font-weight: 800;
`;

export const ItemStyled = styled(Div)`
  font-family: SegoeUI;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  color: #283148;
  align-items: center;
  cursor: pointer;
  padding: 15px 83px;
  background-color: #eef1f1;
  position: relative;
  ${props => (props.active ? activeStyles : '')}
`;

export const Line = styled.div`
  width: 0;
  height: 30px;
  border: solid 1px #a7abab;
  position: absolute;
  right: 0px;
  bottom: 10px;
`;
