import React from 'react';
import { Div } from 'components';
import {
  Data,
  DataName,
  DataValue,
} from '../../../appointments/appointment/courses/style';
import { CRButton } from 'components';
import ListInvoiceTransactions from './list-invoice-transactions';

const Invoice = ({ invoice, onEditPaid, invoiceTransactions, allInvoices }) => {
  const { paid, amount, status } = invoice;
  return (
    <>
      <Div textAlign="right">
        <CRButton mb="10px" onClick={allInvoices}>
          All Invoices
        </CRButton>
      </Div>
      <Div textAlign="right" border="1px solid #eef1f1" m="5px" p="5px">
        {/* {course.status !== 'Cancelled' && course.status !== 'Rejected' && (
          <CRButton
            variant="primary"
            mt={2}
            mr={1}
            onClick={() => onDeleteCourse(course)}
          >
            Delete This Course
          </CRButton>
        )} */}
        {/* <CRButton
          variant="primary"
          mt={2}
          mr={1}
          onClick={() => onEditDoctor(course)}
        >
          Assign Doctor
        </CRButton> */}
        {amount > paid && status === 'InProgress' && (
          <CRButton
            variant="primary"
            mr={1}
            onClick={() => onEditPaid(invoice)}
          >
            Pay
          </CRButton>
        )}
        {/* {course.type === 'Perunit' && (
          <CRButton variant="primary" mr={1} onClick={() => onAddUnits(course)}>
            Add Units
          </CRButton>
        )} */}
        {/* {course.type === 'Perunit' && (
          <CRButton
            variant="primary"
            mr={1}
            onClick={() => onEditUnits(course)}
          >
            Edit Units
          </CRButton>
        )}
        <CRButton
          variant="danger"
          onClick={() => {
            onFinishCourse(course);
          }}
        >
          Finish
        </CRButton> */}
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

        <Div textAlign="left" mt={20}>
          <ListInvoiceTransactions invoiceTransactions={invoiceTransactions} />
        </Div>
      </Div>
    </>
  );
};
export default Invoice;
