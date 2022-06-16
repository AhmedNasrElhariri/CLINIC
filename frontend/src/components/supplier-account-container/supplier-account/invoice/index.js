import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Data,
  DataName,
  DataValue,
} from '../../../appointments/appointment/courses/style';
import { CRButton, Div } from 'components';
import ListInvoiceTransactions from './list-invoice-transactions';

const Invoice = ({
  invoice,
  onEditPaid,
  invoiceTransactions,
  allInvoices,
  onEditTransaction,
  t,
}) => {
  const { paid, amount, status } = invoice;
  const ref = useRef();
  return (
    <>
      <Div>
        <CRButton mb="10px" onClick={allInvoices}>
          {t('allInvoices')}
        </CRButton>
      </Div>
      <Div border="1px solid #eef1f1" m="5px" p="5px">
        {amount > paid && status === 'InProgress' && (
          <CRButton
            variant="primary"
            mr={1}
            ml={1}
            onClick={() => onEditPaid(invoice)}
          >
            {t('pay')}
          </CRButton>
        )}

        <ReactToPrint
          trigger={() => (
            <CRButton primary mb={20}>
              {t('print')}
            </CRButton>
          )}
          content={() => ref.current}
        />

        <Data>
          <DataName>{t('name')} : </DataName>
          <DataValue>{invoice?.name}</DataValue>
        </Data>
        <Data>
          <DataName>{t('revenueAmount')} : </DataName>
          <DataValue>{invoice.amount}</DataValue>
        </Data>
        <Data>
          <DataName>{t('paid')} : </DataName>
          <DataValue>{invoice.paid}</DataValue>
        </Data>
        <Data>
          <DataName>{t('remaining')} : </DataName>
          <DataValue>{invoice.amount - invoice.paid}</DataValue>
        </Data>

        <Data>
          <DataName>{t('status')} : </DataName>
          <DataValue>{invoice.status}</DataValue>
        </Data>
        <Data>
          <DataName>{t('description')} : </DataName>
          <DataValue>{invoice.description}</DataValue>
        </Data>

        <Div textAlign="left" mt={20}>
          <ListInvoiceTransactions
            invoiceTransactions={invoiceTransactions}
            onEdit={onEditTransaction}
            t={t}
          />
        </Div>

        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={ref} mt={20} mr={10}>
            <Data>
              <DataName>Name : </DataName>
              <DataValue>{invoice?.name}</DataValue>
            </Data>
            <Data>
              <DataName>Amount : </DataName>
              <DataValue>{invoice.amount}</DataValue>
            </Data>
            <Data>
              <DataName>Paid : </DataName>
              <DataValue>{invoice.paid}</DataValue>
            </Data>
            <Data>
              <DataName>Unpaid : </DataName>
              <DataValue>{invoice.amount - invoice.paid}</DataValue>
            </Data>

            <Data>
              <DataName>status : </DataName>
              <DataValue>{invoice.status}</DataValue>
            </Data>
            <Data>
              <DataName>Description : </DataName>
              <DataValue>{invoice.description}</DataValue>
            </Data>
          </Div>
        </Div>
      </Div>
    </>
  );
};
export default Invoice;
