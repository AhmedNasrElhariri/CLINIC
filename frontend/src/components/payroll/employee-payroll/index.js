import React, { useRef, useCallback } from 'react';
import { useLocation } from 'react-router';
import { usePayroll, useModal, useForm } from 'hooks';
import ReactToPrint from 'react-to-print';
import { Icon } from 'rsuite';
import * as R from 'ramda';
import {
  HeaderRow,
  Cell,
  RowData,
  RowDataCell,
  TotalData,
  TotalCell,
} from './style';
import { Div, CRButton } from 'components';
import EditTransaction from './edit-transaction';
import { useTranslation } from 'react-i18next';

const initValue = { amount: 0 };

export default function EmployeePayroll(props) {
  const location = useLocation();
  const { t } = useTranslation();
  const ref = useRef();
  const { visible, open, close } = useModal();
  const userId = location.state.id;
  const { userTransactions, editPayrollTransaction } = usePayroll({
    userId,
    onEdit: () => {
      close();
    },
  });
  const { formValue, setFormValue } = useForm({
    initValue,
  });
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

  const handleClickEdit = useCallback(
    data => {
      console.log(data, 'DDD');
      const tran = R.pick(['id', 'amount'])(data);
      setFormValue({ ...tran });
      open();
    },
    [open, setFormValue]
  );
  const handleAdd = useCallback(() => {
    editPayrollTransaction({
      variables: {
        amount: formValue.amount,
        id: formValue.id,
      },
    });
  }, [formValue]);
  console.log(formValue, 'FFF');
  return (
    <>
      <Div style={{ float: 'right' }}>
        <ReactToPrint
          trigger={() => (
            <CRButton variant="primary" data-trigger width={106} height={34}>
              {t('print')} <Icon icon="print" data-trigger />
            </CRButton>
          )}
          content={() => ref.current}
        />
      </Div>
      <HeaderRow mt={100}>
        <Cell>{t('date')}</Cell>
        <Cell>{t('reason')}</Cell>
        <Cell>{t('basicSalary')}</Cell>
        <Cell>{t('commission')}</Cell>
        <Cell>{t('advance')}</Cell>
        <Cell>{t('incentive')}</Cell>
        <Cell>{t('deduction')}</Cell>
        <Cell></Cell>
      </HeaderRow>
      {userTransactions.map(transaction => (
        <RowData>
          <RowDataCell color="#1b253a">
            {transaction.date.split('T')[0]}
          </RowDataCell>
          <RowDataCell color="#1b253a">{transaction.reason}</RowDataCell>
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
            Edit
            <Icon icon="edit" onClick={() => handleClickEdit(transaction)} />
          </RowDataCell>
        </RowData>
      ))}
      <TotalData>
        <TotalCell>{t('total')}</TotalCell>
        <TotalCell> </TotalCell>
        <TotalCell>{salary}</TotalCell>
        <TotalCell>{totalCommision}</TotalCell>
        <TotalCell>{-1 * totalAdvance}</TotalCell>
        <TotalCell>{totalIncentive}</TotalCell>
        <TotalCell>{-1 * totalDeduction}</TotalCell>
        <TotalCell>
          {t('netSalary')} = {netSalary}
        </TotalCell>
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
              <RowDataCell color="#1b253a">{transaction.reason}</RowDataCell>
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
                {transaction.type === 'Deduction'
                  ? -1 * transaction.amount
                  : ''}
              </RowDataCell>
              <RowDataCell color="#bc3254">{'   '}</RowDataCell>
            </RowData>
          ))}
          <TotalData>
            <TotalCell>{'Total'}</TotalCell>
            <TotalCell> </TotalCell>
            <TotalCell>{salary}</TotalCell>
            <TotalCell>{totalCommision}</TotalCell>
            <TotalCell>{-1 * totalAdvance}</TotalCell>
            <TotalCell>{totalIncentive}</TotalCell>
            <TotalCell>{-1 * totalDeduction}</TotalCell>
            <TotalCell>Net Salary = {netSalary}</TotalCell>
          </TotalData>
        </Div>
      </Div>
      <EditTransaction
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
      />
    </>
  );
}
