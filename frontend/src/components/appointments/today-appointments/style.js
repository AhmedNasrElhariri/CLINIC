import React from 'react';
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { Div, H6 } from 'components';

export const Headers = styled(FlexboxGrid)`
  border-bottom: ${props => `2px solid ${props.theme.colors.border}`};
  padding: 1.3rem 6rem;
`;

Headers.Item = ({ children }) => (
  <FlexboxGrid.Item colspan={4}>
    <H6 color="texts.2">{children}</H6>
  </FlexboxGrid.Item>
);

export const Body = styled(Div)`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 1.3rem 6rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

Body.Content = styled(Div)`
  flex-grow: 1;
`;
export const UL = styled.ul`
  background: #ffffffc7;
  width: 100%;
  height: 100%;
  margin-bottom: 0px;
`;
export const LI = styled.li`
  padding: 5px;
  font-weight: bold;
  span {
    font-weight: normal;
  }
`;
export const DIV = styled.div`
  display: flex;
  background-color: #9e9e9eb3;
  margin: 0px 20px;
`;
