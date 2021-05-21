import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';

import { MainContainer, Div, CRCard, CRButton, H6 } from 'components';
import Toolbar from '../toolbar';
import ListData from '../list-data';
import Tabs from '../tabs';
import Filter from '../../filters';
import Profit from '../profit';
import { useAccounting, useAppointments } from 'hooks';

import {
  CREATE_EXPENSE,
  CREATE_REVENUE,
  UPDATE_EXPENSE,
  UPDATE_REVENUE,
} from 'apollo-client/queries';
import { ACCOUNTING_VIEWS } from 'utils/constants';

import AccountingForm, { useAccountingForm } from '../form';
import Summary from '../summary';
import PdfView from '../toolbar/pdf';
import { formatDate } from 'utils/date';
import { CRLabel } from 'components/widgets';

const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];

const AccountingContainer = () => {
  const [activeTab, setActiveTab] = useState('0');
  const [view, setView] = useState(ACCOUNTING_VIEWS.WEEK);
  const [period, setPeriod] = useState([]);

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted({ createExpense: expnese }) {
      Alert.success('Expense Added Successfully');
      createExpenseForm.hide();
    },
    update(cache, { data: { createExpense: expnese } }) {
      updateExpensesCache([...expenses, expnese]);
    },
    onError() {
      Alert.error('Failed to add new Expense');
    },
  });

  const [createRevenue] = useMutation(CREATE_REVENUE, {
    onCompleted({ createRevenue: revenue }) {
      Alert.success('Revenue Added Successfully');
      createRevenueForm.hide();
    },
    update(cache, { data: { createRevenue: revenue } }) {
      updateRevenuesCache([...revenues, revenue]);
    },
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

  const {
    expenses,
    revenues,
    totalExpenses,
    totalRevenues,
    updateExpensesCache,
    updateRevenuesCache,
    timeFrame,
  } = useAccounting({ view, period });
  const { filterBranches } = useAppointments();
  return (
    <>
      <MainContainer
        title="Accounting"
        more={
          <Div display="flex">
            <CRButton variant="primary" onClick={createRevenueForm.show}>
              Reveneue +
            </CRButton>
            <CRButton variant="primary" onClick={createExpenseForm.show} ml={1}>
              Expense +
            </CRButton>
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
                <CRLabel style={{color:'#51C6F3'}}>Reveneue</CRLabel>
                <Filter
                  appointments={revenues}
                  branches={filterBranches}
                  render={revs => (
                    <ListData
                      data={revs}
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
                <ListData
                  title="Expenses"
                  data={expenses}
                  onEdit={expense => {
                    editExpenseForm.setFormValue(R.pick(ENTITY_PROPS)(expense));
                    editExpenseForm.show();
                  }}
                />
              </Div>
            </Div>
          ) : (
            <Summary expenses={totalExpenses} revenues={totalRevenues} />
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
