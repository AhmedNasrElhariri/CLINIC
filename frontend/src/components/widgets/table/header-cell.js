import React from 'react';
import { Table } from 'rsuite';
import { H6 } from '../html/index';

export default ({ children, ...props }) => (
  <Table.HeaderCell {...props}>
    <H6 color="texts.2">{children}</H6>
  </Table.HeaderCell>
);