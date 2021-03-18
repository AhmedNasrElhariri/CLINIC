import React from 'react';
import styled from 'styled-components';

import { Table } from 'rsuite';
import { H6 } from '../html/index';

import { variant } from 'styled-system';
import lightTheme from 'styles/light';

export const CRCell = styled(H6)(
  variant({
    variants: lightTheme.variantBackgroundColors,
  }),
  variant({
    prop: 'coloring',
    variants: lightTheme.variantColors,
  })
);
export const CRCellStyled = styled(CRCell).attrs(
  ({ bold, semiBold, block}) => ({
    fontWeight: bold ? 800 : semiBold ? 600 : 400,
  })
)``;
const handleBackgroundColor = (data, dataKey) => {
  let coloring = 'secondary';
  if (dataKey === 'status') {
    if (data[dataKey] === 'Waiting') {
      coloring = 'danger';
    } else if (data[dataKey] === 'Finished') {
      coloring = 'primary100';
    } else {
      coloring = 'green';
    }
  }
  return coloring;
};
const handleColor = (data, dataKey) => {
  let variant = 'default';
  if (dataKey === 'status') {
    if (data[dataKey] === 'Waiting' || 'Finished' || 'Arrived') {
      variant = 'white';
    }
  }
  if (dataKey === 'type' && data[dataKey] === 'examination') {
    variant = 'primary100';
  } else if (dataKey === 'type' && data[dataKey] === 'Follow-up') {
    variant = 'green';
  } else if (dataKey === 'type' && data[dataKey] === 'Session') {
    variant = 'yello';
  } else if (dataKey === 'type' && data[dataKey] === 'Surgery') {
    variant = 'color100';
  } else if (dataKey === 'type' && data[dataKey] === 'Urgent') {
    variant = 'color200';
  }
  return variant;
};

export default ({ children, bold, semiBold, dataKey, ...props }) => (
  <Table.Cell {...props}>
    {children
      ? children
      : data => (
        
          <CRCellStyled
            bold={bold}
            semiBold={semiBold}
            variant={handleBackgroundColor(data, dataKey)}
            coloring={handleColor(data, dataKey)}
            {...props}
          >
            {data[dataKey]}
          </CRCellStyled>
        )}
  </Table.Cell>
);
