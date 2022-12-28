import styled from 'styled-components';
import { Div } from 'components/widgets';

export const GridStyled = styled(Div)`
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: #2196f3;
    padding: 10px;
    column-gap: 50px;
    row-gap: 50px;
  }
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;
  }
`;
