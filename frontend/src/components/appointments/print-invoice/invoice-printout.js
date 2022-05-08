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
      couponsValue,
    },
    ref
  ) => {
    const invoiceNumber = R.propOr(0, 'invoiceCounter')(organization);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const { pageSetupData } = useConfigurations();
    const pageSetupRow = pageSetupData.find(
      element => element.type === 'invoice'
    );

    const marginTop = pageSetupRow?.top * 37.7952755906 || 0;
    const marginRight = pageSetupRow?.right * 37.7952755906 || 0;
    const marginBottom = pageSetupRow?.bottom * 37.7952755906 || 0;
    const marginLeft = pageSetupRow?.left * 37.7952755906 || 0;
    let userPayment = 0;
    const fullOthersName = 'Others - ' + othersName;
    const Count = year + '' + month + '' + day + '/' + invoiceNumber;
    const { configurations } = useConfigurations();
    const enable = R.propOr(false, 'enableInvoiceCounter')(configurations);
    if (option.option === 'fixed') {
      userPayment = option.amount;
    } else if (option.option === 'percentage') {
      userPayment = option.amount * total * 0.01;
    }
    return (
      <Div height={0} overflow="hidden">
        <StyledContainer
          ref={ref}
          style={{
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
          }}
        >
          {enable ? <StyledHeader>{organization.name}</StyledHeader> : <></>}
          <H5 mb={3}>Invoice {enable ? Count : ''}</H5>
          <H5 mb={3}>Patient Name {' : ' + patientName}</H5>
          <H6 mb={50}>Date : {formatDate(new Date())}</H6>
          {items.map((item, idx) => (
            <ItemPrice {...item} key={idx} />
          ))}
          <TotalPrice name={fullOthersName} price={others} />
          <Divider />
          <TotalPrice name="Subtotal" price={subtotal} />
          <TotalPrice name="Discount" price={discount} />
          <TotalPrice name="Coupons Value" price={couponsValue} />
          <TotalPrice name="Total" price={total} />
          {userPayment > 0 && (
            <>
              <Divider />
              <TotalPrice name="User Payment" price={userPayment} />
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
