import styled from 'styled-components';
import { Div } from 'components';

export const ChoiceContainerStyled = styled.div`
  height: 77px;
  margin: 0 0 20px;
  padding: 10px 20px;
  background-color: #eef1f1;
`;

export const ButtonDiv = styled.div`
  position: absolute;
  right: 10px;
`;
export const Container = styled.div`
  display: flex;
  padding: 10px;
  position: relative;
`;
export const ChoiceName = styled.h6`
  margin-left: ${props => props.ml};
`;
