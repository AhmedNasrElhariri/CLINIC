import styled from 'styled-components';
import { Div } from 'components/widgets';

export const GridStyled = styled(Div)`
  display: grid;
  grid-template-columns: ${props =>
    `repeat(auto-fit, minmax(calc((100% - 50px)/${props.colsNo}), 1fr)) 50px`};
  background-color: #2196f3;
  padding: 10px;
  column-gap: 10px;
  row-gap: 10px;
`;

export const GridCell = styled(Div)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
`;
