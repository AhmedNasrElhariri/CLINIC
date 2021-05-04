import React from 'react';

import { StyledContainer, StyledHeader } from './style';
import { H5, H6, Div, H7 } from 'components';
import { formatDate } from 'utils/date';
import { Divider } from 'rsuite';
import { useConfigurations } from 'hooks';

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
  ({ items, discount, subtotal, total, organization,others }, ref) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const Count =
      year + '' + month + '' + day + '/' + organization.invoiceCounter;
    const { configurations } = useConfigurations();
    const enable = configurations?.enableInvoiceCounter;
    return (
      <Div height={0} overflow="hidden">
        <StyledContainer ref={ref}>
          {enable ? <StyledHeader>{organization.name}</StyledHeader> : <></>}
          <H5 mb={3}>Invoice {enable ? Count : ''}</H5>
          <H6 mb={50}>Date : {formatDate(new Date())}</H6>
          {items.map((item, idx) => (
            <ItemPrice {...item} key={idx} />
          ))}
          <Divider />
          <TotalPrice name="Others" price={others} />
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
