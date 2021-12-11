import React,{useRef} from 'react';
import { useLocation } from 'react-router';
import { usePayroll } from 'hooks';
import ReactToPrint from 'react-to-print';
import { Icon } from 'rsuite';
import {
  HeaderRow,
  Cell,
  RowData,
  RowDataCell,
  TotalData,
  TotalCell,
} from './style';
import { Div,CRButton } from 'components';

export default function EmployeePayroll(props) {
  const location = useLocation();
  const userId = location.state.id;
  const { userTransactions } = usePayroll({ userId });
  let salary = 0;
  let totalCommision = 0,
    totalIncentive = 0,
    totalAdvance = 0,
    totalDeduction = 0,
    netSalary = 0;
  userTransactions.map(transaction => {
    if (transaction.type === 'Commision') {
      totalCommision += transaction.amount;
    } else if (transaction.type === 'Advance') {
      totalAdvance += transaction.amount;
    } else if (transaction.type === 'Incentive') {
      totalIncentive += transaction.amount;
    } else {
      totalDeduction += transaction.amount;
    }
    salary = transaction.payrollUser.salary;
  });
  netSalary =
    totalCommision + totalAdvance + totalIncentive + totalDeduction + salary;
    const ref = useRef();
  return (
    <>
      <Div style={{float:"right"}}>
      <ReactToPrint
        trigger={() => (
          <CRButton variant="primary" data-trigger width={106} height={34}>
            Print <Icon icon="print" data-trigger />
          </CRButton>
        )}
        content={() => ref.current}
      />
    </Div>
      <HeaderRow mt={100}>
        <Cell>Date</Cell>
        <Cell>Reason</Cell>
        <Cell>Basic Salary</Cell>
        <Cell>Commission</Cell>
        <Cell>Advance</Cell>
        <Cell>Incentive</Cell>
        <Cell>Deduction</Cell>
        <Cell></Cell>
      </HeaderRow>
      {userTransactions.map(transaction => (
        <RowData>
          <RowDataCell color="#1b253a">
            {transaction.date.split('T')[0]}
          </RowDataCell>
          <RowDataCell color="#1b253a">
            {transaction.reason}
          </RowDataCell>
          <RowDataCell color="#1b253a">
            {transaction.payrollUser.salary}
          </RowDataCell>
          <RowDataCell color="#037f4b">
            {transaction.type === 'Commision' ? transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#037f4b">
            {transaction.type === 'Advance' ? -1 * transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#bc3254">
            {transaction.type === 'Incentive' ? transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#bc3254">
            {transaction.type === 'Deduction' ? -1 * transaction.amount : ''}
          </RowDataCell>
          <RowDataCell>
            Edit<Icon icon='edit'/>
          </RowDataCell>
        </RowData>
      ))}
      <TotalData>
        <TotalCell>{'Total'}</TotalCell>
        <TotalCell>{' '}</TotalCell>
        <TotalCell>{salary}</TotalCell>
        <TotalCell>{totalCommision}</TotalCell>
        <TotalCell>{-1 * totalAdvance}</TotalCell>
        <TotalCell>{totalIncentive}</TotalCell>
        <TotalCell>{-1 * totalDeduction}</TotalCell>
        <TotalCell>Net Salary = {netSalary}</TotalCell>
      </TotalData>
      <Div style={{ overflow: 'hidden', height: '0px' }}>
        <Div ref={ref} m={30}>
        <HeaderRow>
        <Cell>Date</Cell>
        <Cell>Reason</Cell>
        <Cell>Basic Salary</Cell>
        <Cell>Commission</Cell>
        <Cell>Advance</Cell>
        <Cell>Incentive</Cell>
        <Cell>Deduction</Cell>
        <Cell></Cell>
      </HeaderRow>
      {userTransactions.map(transaction => (
        <RowData>
          <RowDataCell color="#1b253a">
            {transaction.date.split('T')[0]}
          </RowDataCell>
          <RowDataCell color="#1b253a">
            {transaction.reason}
          </RowDataCell>
          <RowDataCell color="#1b253a">
            {transaction.payrollUser.salary}
          </RowDataCell>
          <RowDataCell color="#037f4b">
            {transaction.type === 'Commision' ? transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#037f4b">
            {transaction.type === 'Advance' ? -1 * transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#bc3254">
            {transaction.type === 'Incentive' ? transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#bc3254">
            {transaction.type === 'Deduction' ? -1 * transaction.amount : ''}
          </RowDataCell>
          <RowDataCell color="#bc3254">
            {"   "}
          </RowDataCell>
        </RowData>
      ))}
      <TotalData>
        <TotalCell>{'Total'}</TotalCell>
        <TotalCell>{' '}</TotalCell>
        <TotalCell>{salary}</TotalCell>
        <TotalCell>{totalCommision}</TotalCell>
        <TotalCell>{-1 * totalAdvance}</TotalCell>
        <TotalCell>{totalIncentive}</TotalCell>
        <TotalCell>{-1 * totalDeduction}</TotalCell>
        <TotalCell>Net Salary = {netSalary}</TotalCell>
      </TotalData>
        </Div>
      </Div>
    </>
  );
}
