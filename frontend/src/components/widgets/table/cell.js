import React from 'react';
import styled, { css } from 'styled-components';

import { byTheme } from 'services/theme';
import { Table } from 'rsuite';
import { H6 } from '../html/index';

const CRCell = styled(H6).attrs(({ bold, semiBold }) => ({
  fontWeight: bold ? 800 : semiBold ? 600 : 400,
}))`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.texts[0]};
`;

export default ({ children, bold, semiBold, dataKey, ...props }) => (
  <Table.Cell {...props}>
    {data => (
      <CRCell bold={bold} semiBold={semiBold}>
        {data[dataKey]}
      </CRCell>
    )}
  </Table.Cell>
);
