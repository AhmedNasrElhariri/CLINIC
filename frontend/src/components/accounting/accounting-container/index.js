import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Alert } from 'rsuite';

import { MainContainer, Div, CRCard } from 'components';
import Toolbar from '../toolbar';
import AddExpense from '../add-expense';
import ListData from '../list-data';
import Tabs from '../tabs';

import useFetch from './fetch-data';

import { CREATE_EXPENSE } from 'apollo-client/queries';
import useGlobalState from 'state';
import Summary from '../summary';

const AccountingContainer = () => {
  const [clinic] = useGlobalState('currentClinic');
  const [activeTab, setActiveTab] = useState('1');
  const [activePeriod, setActivePeriod] = useState('0');
  const [visible, setVisible] = useState(false);

  const { expenses, revenues, totalExpenses, totalRevenues } = useFetch();
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted() {
      Alert.success('Expense Added Successfully');
      setVisible(false);
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
            <Div display="flex">
              <Div flexGrow={1} mr={2}>
                <ListData title="Revenue" data={revenues} />
              </Div>

              <Div flexGrow={1} ml={2}>
                <ListData title="Expenses" data={expenses} />
              </Div>
            </Div>
          ) : (
            <Summary expenses={totalExpenses} revenues={totalRevenues} />
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
