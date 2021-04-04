import React from 'react';
import * as R from 'ramda';
import { Table } from 'rsuite';

import { CRCellStyled } from './style';

const CRCell = ({ children, getValue, dataKey,onTreeToggle, ...props }) => (
  <Table.Cell {...props}>
    {children
      ? children
      : data => (
          <CRCellStyled {...props}>
            {getValue
              ? getValue(R.path(dataKey.split('.'))(data), data, dataKey)
              : R.path(dataKey.split('.'))(data)}
          </CRCellStyled>
        )}
  </Table.Cell>
);

CRCell.defaultProps = {
  dataKey: '',
};

export default CRCell;
