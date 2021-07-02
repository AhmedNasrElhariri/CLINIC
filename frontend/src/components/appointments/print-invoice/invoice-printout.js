import React from 'react';
import * as R from 'ramda';
import { StyledContainer, StyledHeader } from './style';
import { H5, H6, Div, H7 } from 'components';
import { formatDate } from 'utils/date';
import { Divider } from 'rsuite';
import { useConfigurations } from 'hooks';

const ItemPrice = ({ name, number, price }) => (
  <Div display="flex" justifyContent="space-between">
    <H7>
      {number}
      {' / '}
      {'  '}
      {name}
    </H7>
    <H7>{price * number}</H7>
  </Div>
);

const TotalPrice = ({ name, price }) => (
  <Div display="flex" justifyContent="space-between" mb={1}>
    <H7>{name}</H7>
    <H6>{price}</H6>
  </Div>
);

const InvoicePrintout = React.forwardRef(
  (
    {
      items,
      discount,
      subtotal,
      total,
      organization,
      others,
      patientName,
      othersName,
      option,
      appointmentPrice,
    },
    ref
  ) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let userPayment = 0;
    const fullOthersName = 'Others - ' + othersName;
    const Count =
      year + '' + month + '' + day + '/' + organization?.invoiceCounter;
    const { configurations } = useConfigurations();
    const enable = R.isEmpty(configurations)
      ? configurations.enableInvoiceCounter
      : false;
    if (option.option === 'fixed') {
      userPayment = option.amount;
    } else if (option.option === 'percentage') {
      userPayment = option.amount * total * 0.01;
    }
    return (
      <Div height={0} overflow="hidden">
        <StyledContainer ref={ref}>
          {enable ? <StyledHeader>{organization.name}</StyledHeader> : <></>}
          <H5 mb={3}>Invoice {enable ? Count : ''}</H5>
          <H5 mb={3}>Patient Name {' : ' + patientName}</H5>
          <H6 mb={50}>Date : {formatDate(new Date())}</H6>
          <Div display="flex" justifyContent="space-between" mb={1}>
            <H7>{appointmentPrice.Apptype}</H7>
            <H6>{appointmentPrice.price}</H6>
          </Div>
          {items.map((item, idx) => (
            <ItemPrice {...item} key={idx} />
          ))}
          <TotalPrice name={fullOthersName} price={others} />
          <Divider />
          <TotalPrice name="Subtotal" price={subtotal} />
          <TotalPrice name="Discount" price={discount} />
          <TotalPrice name="Total" price={total} />
          {userPayment > 0 && (
            <>
              <Divider />
              <TotalPrice name="User Payment" price={userPayment} />
              <TotalPrice name="Company Payment" price={total - userPayment} />
            </>
          )}
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
