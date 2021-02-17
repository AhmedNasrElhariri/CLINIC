import React from 'react';
import styled from 'styled-components';

import { Table } from 'rsuite';
import { H6 } from '../html/index';

import { variant } from 'styled-system';


export const CRCell = styled(H6)(
  variant({
    variants: {
      primary: {
        bg: '#51C6F3',
      },
      primaryTwo: {
        bg: '#019ae7',
        color: '#ffffff',
      },
      secondary: {
        bg: '#eef1f1',
        color: '#1b253a',
      },
      danger: {
        bg: '#bc3254',
        color: '#ffffff',
      },
      green: {
        bg: '#037f4b',
        color: '#ffffff',
      },
      yello: {
        bg: '#ffcc03',
      },
      different: {
        bg: '#794bd1',
      },
    },
  }),
)
export const CRCellStyled = styled(CRCell).attrs(({ bold, semiBold, block }) => ({
  fontWeight: bold ? 800 : semiBold ? 600 : 400,
}))`
  
`;
const handleColor = (data, dataKey) => {
  let variant = 'secondary';
  if (dataKey == 'status') {
    if (data[dataKey] == 'Waiting') {
      variant = 'danger';
    } else if (data[dataKey] == 'Finished') {
      variant = 'primaryTwo';
    } else {
      variant = 'green';
    }
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
            variant={handleColor(data, dataKey)}
          >
            {data[dataKey]}
          </CRCellStyled>
        )}
  </Table.Cell>
);
