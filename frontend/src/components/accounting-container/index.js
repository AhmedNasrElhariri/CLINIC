import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';

import { MainContainer, Div, CRCard } from '../user-permission/node_modules/components';
import Toolbar from '../toolbar';
import AddExpense from '../add-expense';
import ListData from '../list-data';
import Tabs from '../tabs';

import useFetch from './fetch-data';

import { CREATE_EXPENSE } from '../user-permission/node_modules/apollo-client/queries';
import useGlobalState from '../user-permission/node_modules/state';
import Summary from '../summary';

const AccountingContainer = () => {
  const [clinic] = useGlobalState('currentClinic');
  const [activeTab, setActiveTab] = useState('0');
  const [activePeriod, setActivePeriod] = useState('1');
  const [visible, setVisible] = useState(false);

  const {
    expenses,
    revenues,
    totalExpenses,
    totalRevenues,
    updateCache,
  } = useFetch();
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted({ createExpense: expnese }) {
      Alert.success('Expense Added Successfully');
      setVisible(false);
      updateCache([...expenses,expnese]);
    },
    onError() {
      Alert.error('Failed to add new Expense');
    },
  });

  const handleOk = useCallback(
    expense =>
      createExpense({
        variables: {
          expense: {
            ...expense,
            clinicId: clinic.id,
          },
        },
      }),
    [clinic, createExpense]
  );

  return (
    <>
      <MainContainer title="Accounting" nobody></MainContainer>
      <Tabs onSelect={setActiveTab} activeTab={activeTab} />
      <CRCard borderless>
        <Toolbar
          onAdd={() => setVisible(true)}
          activeKey={activePeriod}
          onSelect={setActivePeriod}
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
          show={visible}
          onCancel={() => setVisible(false)}
          onOk={handleOk}
        />
      </CRCard>
    </>
  );
};

AccountingContainer.propTypes = {};

export default AccountingContainer;
