import React from 'react';
import { Table } from 'rsuite';
import { H6 } from '../html/index';

const CRHeaderCell = ({ children, ...props }) => (
  <Table.HeaderCell {...props}>
    <H6 color="#2a2a2a">{children}</H6>
  </Table.HeaderCell>
);

export default CRHeaderCell;
