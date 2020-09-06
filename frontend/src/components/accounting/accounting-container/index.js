import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { MainContainer, Div, CRCard } from 'components';
import Toolbar from '../toolbar';
import AddExpense from '../add-expense';
import AddRevenue from '../add-revenue';
import ListData from '../list-data';
import Tabs from '../tabs';

import useFetch from './fetch-data';

import { CREATE_EXPENSE, CREATE_REVENUE } from 'apollo-client/queries';
import useGlobalState from 'state';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import Summary from '../summary';

const TYPES = {
  EXPENSE: 'expense',
  REVENUE: 'revenue',
};

const AccountingContainer = () => {
  const [clinic] = useGlobalState('currentClinic');
  const [activeTab, setActiveTab] = useState('0');
  const [activePeriod, setActivePeriod] = useState(ACCOUNTING_VIEWS.WEEK);
  const [type, setType] = useState(null);

  const {
    expenses,
    revenues,
    totalExpenses,
    totalRevenues,
    updateExpensesCache,
    updateRevenuesCache,
  } = useFetch(activePeriod);

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted({ createExpense: expnese }) {
      Alert.success('Expense Added Successfully');
      setType(null);
      updateExpensesCache([...expenses, expnese]);
    },
    onError() {
      Alert.error('Failed to add new Expense');
    },
  });

  const [createRevenue] = useMutation(CREATE_REVENUE, {
    onCompleted({ createRevenue: revenue }) {
      Alert.success('Expense Added Successfully');
      setType(null);
      updateRevenuesCache([...revenues, revenue]);
    },
    onError() {
      Alert.error('Failed to add new Revenue');
    },
  });

  const handleOk = useCallback(
    val =>
      type === TYPES.EXPENSE
        ? createExpense({
            variables: {
              expense: {
                ...val,
                clinicId: clinic.id,
              },
            },
          })
        : createRevenue({
            variables: {
              revenue: {
                ...val,
                clinicId: clinic.id,
              },
            },
          }),
    [clinic.id, createExpense, createRevenue, type]
  );

  return (
    <>
      <MainContainer title="Accounting" nobody></MainContainer>
      <Tabs onSelect={setActiveTab} activeTab={activeTab} />
      <CRCard borderless>
        <Toolbar
          onAddExpense={() => setType(TYPES.EXPENSE)}
          onAddRevenue={() => setType(TYPES.REVENUE)}
          onPrint={() => setType(TYPES.REVENUE)}
          activeKey={activePeriod}
          onSelect={setActivePeriod}
          data={{ revenues, expenses }}
        />
        <Div pt={5}>
          {activeTab === '0' ? (
            <Summary expenses={totalExpenses} revenues={totalRevenues} />
          ) : (
            <Div display="flex">
              <Div flexGrow={1} mr={2}>
                <ListData title="Revenue" data={revenues} />
              </Div>

              <Div flexGrow={1} ml={2}>
                <ListData title="Expenses" data={expenses} />
              </Div>
            </Div>
          )}
        </Div>
        <AddExpense
          show={type === TYPES.EXPENSE}
          onCancel={() => setType(false)}
          onOk={handleOk}
        />
        <AddRevenue
          show={type === TYPES.REVENUE}
          onCancel={() => setType(false)}
          onOk={handleOk}
        />
      </CRCard>
    </>
  );
};

AccountingContainer.propTypes = {};

export default AccountingContainer;
