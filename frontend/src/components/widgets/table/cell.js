import React from 'react';
import styled from 'styled-components';

import { Table } from 'rsuite';
import { H6 } from '../html/index';

export const CRCellStyled = styled(H6).attrs(({ bold, semiBold }) => ({
  fontWeight: bold ? 800 : semiBold ? 600 : 400,
}))`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.texts[0]};
`;

export default ({ children, bold, semiBold, dataKey, ...props }) => (
  <Table.Cell {...props}>
    {children
      ? children
      : data => (
          <CRCellStyled bold={bold} semiBold={semiBold}>
            {data[dataKey]}
          </CRCellStyled>
        )}
  </Table.Cell>
);
