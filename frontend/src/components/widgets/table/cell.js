import React from 'react';
import * as R from 'ramda';
import { Table } from 'rsuite';

import { CRCellStyled } from './style';
import { Div } from '../html';

const CRCell = ({
  children,
  getValue,
  dataKey,
  height,
  onTreeToggle,
  ...props
}) => (
  <Table.Cell {...props}>
    {data => {
      return (
        <Div height={height - 2}>
          {children ? (
            children(data)
          ) : (
            <CRCellStyled {...props}>
              {getValue
                ? getValue(R.path(dataKey.split('.'))(data), data, dataKey)
                : R.path(dataKey.split('.'))(data)}
            </CRCellStyled>
          )}
        </Div>
      );
    }}
  </Table.Cell>
);

CRCell.defaultProps = {
  dataKey: '',
};

export default CRCell;
