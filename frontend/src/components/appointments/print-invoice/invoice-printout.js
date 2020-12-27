import React from 'react';

import { StyledContainer } from './style';
import { H5, H6, Div, H7 } from 'components';
import { formatDate } from 'utils/date';
import { Divider } from 'rsuite';

const ItemPrice = ({ name, price }) => (
  <Div display="flex" justifyContent="space-between">
    <H7>{name}</H7>
    <H7>{price}</H7>
  </Div>
);

const TotalPrice = ({ name, price }) => (
  <Div display="flex" justifyContent="space-between" mb={1}>
    <H7>{name}</H7>
    <H6>{price}</H6>
  </Div>
);

const InvoicePrintout = React.forwardRef(
  ({ items, discount, subtotal, total }, ref) => {
    return (
      <Div height={0} overflow="hidden">
        <StyledContainer ref={ref}>
          <H5 mb={3}>Invoice</H5>
          <H6 mb={50}>Date : {formatDate(new Date())}</H6>
          {items.map((item, idx) => (
            <ItemPrice {...item} key={idx} />
          ))}
          <Divider />
          <TotalPrice name="Subtotal" price={subtotal} />
          <TotalPrice name="Discount" price={discount} />
          <TotalPrice name="Total" price={total} />
        </StyledContainer>
      </Div>
    );
  }
);

InvoicePrintout.defaultProps = {
  items: [],
  gross: 0,
  total: 0,
};

export default InvoicePrintout;
