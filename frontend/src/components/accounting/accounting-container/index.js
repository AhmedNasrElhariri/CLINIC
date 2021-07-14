import React, { useState, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';
import { MainContainer, Div, CRCard, CRButton, H6 } from 'components';
import Toolbar from '../toolbar';
import ListExpenseData from '../list-data/expense.js';
import ListRevenueData from '../list-data/revenue.js';
import Tabs from '../tabs';
import Profit from '../profit';
import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
import { useAccounting, useAppointments } from 'hooks';
import {
  CREATE_EXPENSE,
  CREATE_REVENUE,
  UPDATE_EXPENSE,
  UPDATE_REVENUE,
} from 'apollo-client/queries';
import BranchFilter from '../../filters';
import { Can } from 'components/user/can';
import ExpenseFilter from '../filter/expense-filter';
import RevenueFilter from '../filter/revenue-filter';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import AccountingForm, { useAccountingForm } from '../form';
import Summary from '../summary';
import PdfView from '../toolbar/pdf';
import { formatDate } from 'utils/date';
const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initalVal = {
  expenseType: '',
  revenueName: '',
};
const AccountingContainer = () => {
  const [activeTab, setActiveTab] = useState('0');
  const { filterBranches } = useAppointments();
  const [view, setView] = useState(ACCOUNTING_VIEWS.WEEK);
  const [period, setPeriod] = useState([]);
  const [formValue, setFormValue] = useState(initalVal);
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted({ createExpense: expnese }) {
      Alert.success('Expense Added Successfully');
      createExpenseForm.hide();
    },
    refetchQueries: [
      {
        query: LIST_EXPENSES,
      },
    ],
    onError() {
      Alert.error('Failed to add new Expense');
    },
  });

  const [createRevenue] = useMutation(CREATE_REVENUE, {
    onCompleted({ createRevenue: revenue }) {
      Alert.success('Revenue Added Successfully');
      createRevenueForm.hide();
    },
    refetchQueries: [
      {
        query: LIST_REVENUES,
      },
    ],
    onError() {
      Alert.error('Failed to add new Revenue');
    },
  });

  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    onCompleted({ updateExpense: expnese }) {
      Alert.success('Expense has been updated Successfully');
      editExpenseForm.hide();
    },
    onError() {
      Alert.error('Failed to update Expense');
    },
  });

  const [updateRevenue] = useMutation(UPDATE_REVENUE, {
    onCompleted({ updateRevenue: revenue }) {
      Alert.success('Revenue has been updated Successfully');
      editRevenueForm.hide();
    },
    onError() {
      Alert.error('Failed to update Revenue');
    },
  });

  const handleCreateRevenue = useCallback(
    revenue => {
      createRevenue({
        variables: {
          revenue,
        },
      });
    },
    [createRevenue]
  );

  const handleCreateExpense = useCallback(
    expense => {
      createExpense({
        variables: {
          expense,
        },
      });
    },
    [createExpense]
  );

  const handleUpdateRevenue = useCallback(
    revenue => {
      updateRevenue({
        variables: {
          revenue: revenue,
        },
      });
    },
    [updateRevenue]
  );

  const handleUpdateExpense = useCallback(
    expense => {
      updateExpense({
        variables: {
          expense,
        },
      });
    },
    [updateExpense]
  );

  const createRevenueForm = useAccountingForm({
    header: 'New Revenue',
    onOk: handleCreateRevenue,
  });
  const createExpenseForm = useAccountingForm({
    header: 'New Expense',
    onOk: handleCreateExpense,
  });
  const editRevenueForm = useAccountingForm({
    header: 'Edit Revenue',
    onOk: handleUpdateRevenue,
  });
  const editExpenseForm = useAccountingForm({
    header: 'Edit Expense',
    onOk: handleUpdateExpense,
  });
  const { expenses, revenues, timeFrame } = useAccounting({
    view,
    period,
  });
  console.log(revenues,'rererree');
  const updatedExpenses = useMemo(
    () =>
      expenses.filter(e =>
        e.expenseType
          .toLowerCase()
          .includes(formValue.expenseType.toLowerCase())
      ),
    [formValue, expenses]
  );
  const totalExpenses = useMemo(
    () => updatedExpenses.reduce((acc, e) => acc + e.amount, 0),
    [updatedExpenses]
  );
  const updatedRevenues = useMemo(
    () =>
      revenues.filter(e =>
        e.name
          .toLowerCase()
          .includes(formValue.revenueName.toLowerCase())
      ),
    [formValue, revenues]
  );
  const totalRevenues = useMemo(
    () => updatedRevenues.reduce((acc, e) => acc + e.amount, 0),
    [updatedRevenues]
  );
  console.log(updatedRevenues);
  return (
    <>
      <MainContainer
        title="Accounting"
        more={
          <Div display="flex">
            <>
              <Can I="AddRevenue" an="Accounting">
                <CRButton variant="primary" onClick={createRevenueForm.show}>
                  Reveneue +
                </CRButton>
              </Can>
              <Can I="AddExpense" an="Accounting">
                <CRButton
                  variant="primary"
                  onClick={createExpenseForm.show}
                  ml={1}
                >
                  Expense +
                </CRButton>
              </Can>
            </>

            <Div ml={1}>
              <PdfView data={{ revenues, expenses }} period={timeFrame} />
            </Div>
          </Div>
        }
        nobody
      ></MainContainer>
      <Tabs onSelect={setActiveTab} activeTab={activeTab} />
      <CRCard borderless>
        <Toolbar
          onAddRevenue={createRevenueForm.show}
          onAddExpense={createExpenseForm.show}
          activeKey={view}
          onSelect={setView}
          data={{ revenues, expenses }}
          onChangePeriod={setPeriod}
        />
        <Div display="flex" my={4}>
          <H6>Showing for :</H6>
          <H6 variant="primary" ml={2} fontWeight="bold">
            {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
          </H6>
        </Div>

        <Div>
          {activeTab === '0' ? (
            <Div display="flex">
              <Div flexGrow={1} mr={2}>
                <RevenueFilter
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
                <BranchFilter
                  appointments={updatedRevenues}
                  branches={filterBranches}
                  render={revenues => (
                    <ListRevenueData
                      title="Revenues"
                      data={revenues}
                      onEdit={revenue => {
                        editRevenueForm.setFormValue(
                          R.pick(ENTITY_PROPS)(revenue)
                        );
                        editRevenueForm.show();
                      }}
                    />
                  )}
                />
              </Div>
              <Div flexGrow={1} ml={2}>
                <ExpenseFilter
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
                <BranchFilter
                  appointments={updatedExpenses}
                  branches={filterBranches}
                  render={expenses => (
                    <ListExpenseData
                      title="Expenses"
                      data={expenses}
                      onEdit={expense => {
                        editExpenseForm.setFormValue(
                          R.pick(ENTITY_PROPS)(expense)
                        );
                        editExpenseForm.show();
                      }}
                    />
                  )}
                />
              </Div>
            </Div>
          ) : (
            <Summary expenses={updatedExpenses} revenues={totalRevenues} />
          )}
        </Div>
        <AccountingForm {...createRevenueForm} />
        <AccountingForm {...createExpenseForm} />
        <AccountingForm {...editRevenueForm} />
        <AccountingForm {...editExpenseForm} />
        <Profit expenses={totalExpenses} revenues={totalRevenues} />
      </CRCard>
    </>
  );
};

AccountingContainer.propTypes = {};

export default AccountingContainer;
