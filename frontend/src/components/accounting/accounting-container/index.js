import React, { useState, useCallback, useMemo, memo } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';
import { ACTIONS } from 'utils/constants';
import {
  Div,
  CRCard,
  CRButton,
  H6,
  BranchSpecialtyUserFilter,
  CRSelectInput,
  MenuPopover,
} from 'components';
import Toolbar from '../toolbar';
import ListExpenseData from '../list-data/expense.js';
import ListRevenueData from '../list-data/revenue.js';
import Profit from '../profit';
import { useAccounting, useBranchTree, useGeneralHook } from 'hooks';
import {
  CREATE_EXPENSE,
  CREATE_REVENUE,
  UPDATE_EXPENSE,
  UPDATE_REVENUE,
} from 'apollo-client/queries';
import { Can } from 'components/user/can';
import ExpenseFilter from '../filter/expense-filter';
import RevenueFilter from '../filter/revenue-filter';
import { ACCOUNTING_VIEWS, ACCOUNT_OPTIONS } from 'utils/constants';
import AccountingForm, { useAccountingForm } from '../form';
import Summary from '../summary';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useGlobalState from 'state';
import { Form, Whisper } from 'rsuite';

const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initalVal = {
  expenseType: '',
  revenueName: '',
  expenseName: '',
  accountingOption: 'All',
  printOrNot: false,
  orderByOption: 'date',
};
const inialCurrentPage = {
  activePage: 1,
};
const inialExpenseCurrentPage = {
  activePage: 1,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const initialExpenseBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const AccountingContainer = () => {
  // const [activeTab] = useState('0');
  const activeTab = '0';
  const [user] = useGlobalState('user');
  const { t } = useTranslation();
  const { filterBranches } = useBranchTree({ action: ACTIONS.View_Accounting });
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [refetchRe, setRefetchRe] = useState(false);
  const [refetchEx, setRefetchEx] = useState(false);
  const [period, setPeriod] = useState([]);
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const [expenseBranchSpecialtyUser, setExpenseBranchSpecialtyUser] = useState(
    initialExpenseBranchValue
  );
  const [formValue, setFormValue] = useState(initalVal);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const [expenseCurrentPage, setExpenseCurrentPage] = useState(
    inialExpenseCurrentPage
  );
  const expensePage = expenseCurrentPage?.activePage;

  const [createExpense, { loading: createExpensesLoading }] = useMutation(
    CREATE_EXPENSE,
    {
      onCompleted({ createExpense: expnese }) {
        Alert.success('Expense Added Successfully');
        createExpenseForm.hide();
        setRefetchEx(true);
      },

      onError() {
        Alert.error('Failed to add new Expense');
      },
    }
  );

  const [createRevenue, { loading: createRevenueLoading }] = useMutation(
    CREATE_REVENUE,
    {
      onCompleted({ createRevenue: revenue }) {
        Alert.success('Revenue Added Successfully');
        createRevenueForm.hide();
        setRefetchRe(true);
      },
      onError() {
        Alert.error('Failed to add new Revenue');
      },
    }
  );

  const [updateExpense, { loading: updateExpensesLoading }] = useMutation(
    UPDATE_EXPENSE,
    {
      onCompleted({ updateExpense: expnese }) {
        Alert.success('Expense has been updated Successfully');
        editExpenseForm.hide();
        setRefetchEx(true);
      },
      onError() {
        Alert.error('Failed to update Expense');
      },
    }
  );

  const [updateRevenue, { loading: updateRevenueLoading }] = useMutation(
    UPDATE_REVENUE,
    {
      onCompleted({ updateRevenue: revenue }) {
        Alert.success('Revenue has been updated Successfully');
        editRevenueForm.hide();
        setRefetchRe(true);
      },
      onError() {
        Alert.error('Failed to update Revenue');
      },
    }
  );
  const {
    expenses,
    revenues,
    totalRevenues,
    totalExpenses,
    RevenuesCount,
    expensesCount,
  } = useAccounting({
    view,
    period,
    page,
    expensePage,
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    expenseBranchId: expenseBranchSpecialtyUser?.branch,
    expenseSpecialtyId: expenseBranchSpecialtyUser?.specialty,
    expenseDoctorId: expenseBranchSpecialtyUser?.doctor,
    revenueName: formValue?.revenueName,
    orderByOption: formValue?.orderByOption,
    expenseName: formValue?.expenseName,
    expenseType: formValue?.expenseType,
    accountingOption: formValue?.accountingOption,
    printOrNot: formValue.printOrNot,
    refetchRe: refetchRe,
    setRefetchRe: setRefetchRe,
    refetchEx,
    setRefetchEx,
  });
  const { timeFrame } = useGeneralHook({ view, period });
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
    header: t('newRevenue'),
    onOk: handleCreateRevenue,
    action: ACTIONS.AddRevenue_Accounting,
  });
  const createExpenseForm = useAccountingForm({
    header: t('newExpense'),
    onOk: handleCreateExpense,
    action: ACTIONS.AddExpense_Accounting,
  });
  const editRevenueForm = useAccountingForm({
    header: t('editRevenue'),
    onOk: handleUpdateRevenue,
    action: ACTIONS.EditRevenue_Accounting,
  });
  const editExpenseForm = useAccountingForm({
    header: t('editExpense'),
    onOk: handleUpdateExpense,
    action: ACTIONS.EditExpense_Accounting,
  });

  const revenuesPages = Math.ceil(RevenuesCount / 20);
  const expensesPages = Math.ceil(expensesCount / 20);
  const updatedExpenses = useMemo(
    () =>
      expenses?.filter(e =>
        e.expenseType
          .toLowerCase()
          .includes(formValue.expenseType.toLowerCase())
      ),
    [formValue, expenses]
  );
  const handleAccountingReport = () => {
    const { paramValue } = ACCOUNT_OPTIONS.find(
      ({ id }) => id === formValue.accountingOption
    );
    axios({
      url: '/accounting',
      method: 'POST',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        expenseBranchId: expenseBranchSpecialtyUser?.branch,
        expenseSpecialtyId: expenseBranchSpecialtyUser?.specialty,
        expenseDoctorId: expenseBranchSpecialtyUser?.doctor,
        revenueName: formValue?.revenueName,
        expenseType: formValue?.expenseType,
        expenseName: formValue?.expenseName,
        columns: paramValue,
        view,
        dateFrom: period[0],
        dateTo: period[1],
        organizationId: user.organizationId,
        orderByOption: formValue?.orderByOption,
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'accounting.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  const handleAccountingExcel = async day => {
    const { paramValue } = ACCOUNT_OPTIONS.find(
      ({ id }) => id === formValue.accountingOption
    );
    axios({
      url: '/accountingExcel',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        expenseBranchId: expenseBranchSpecialtyUser?.branch,
        expenseSpecialtyId: expenseBranchSpecialtyUser?.specialty,
        expenseDoctorId: expenseBranchSpecialtyUser?.doctor,
        revenueName: formValue?.revenueName,
        expenseType: formValue?.expenseType,
        expenseName: formValue?.expenseName,
        columns: paramValue,
        view,
        dateFrom: period[0],
        dateTo: period[1],
        organizationId: user.organizationId,
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `revenues-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };

  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? handleAccountingReport() : handleAccountingExcel();
  }
  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-5">
        <h4>{t('accounting')}</h4>
        <div className="inline-flex flex-wrap gap-y-1 items-center">
          <Can I="AddRevenue" an="Accounting">
            <CRButton variant="primary" onClick={createRevenueForm.show}>
              {t('newRevenue')} +
            </CRButton>
          </Can>
          <Can I="AddExpense" an="Accounting">
            <CRButton
              variant="primary"
              onClick={createExpenseForm.show}
              ml={1}
              mr={1}
            >
              {t('newExpense')} +
            </CRButton>
          </Can>
          <Whisper
            placement="bottomStart"
            trigger="click"
            speaker={<MenuPopover onSelect={handleSelectMenu} />}
          >
            <CRButton>Print</CRButton>
          </Whisper>
        </div>
      </div>

      {/* <Tabs onSelect={setActiveTab} activeTab={activeTab} className="mb-3" /> */}

      <CRCard borderless>
        <Can I="ViewFilters" an="Accounting">
          <Toolbar
            onAddRevenue={createRevenueForm.show}
            onAddExpense={createExpenseForm.show}
            activeKey={view}
            onSelect={setView}
            data={{ revenues, expenses }}
            onChangePeriod={setPeriod}
          />
          <Form>
            <CRSelectInput
              data={ACCOUNT_OPTIONS}
              name="accountOption"
              block
              value={formValue.accountingOption}
              onChange={val =>
                setFormValue({ ...formValue, accountingOption: val })
              }
              className="w-64 my-4"
            />
          </Form>
          <Div display="flex" my={4}>
            <H6>{t('showingFor')} :</H6>
            <H6 variant="primary" ml={2} fontWeight="bold">
              {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
            </H6>
          </Div>
        </Can>

        <Div>
          {activeTab === '0' ? (
            <Div display="flex">
              <Div flexGrow={1} mr={2}>
                <Div display="flex">
                  <RevenueFilter
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </Div>
                <BranchSpecialtyUserFilter
                  formValue={branchSpecialtyUser}
                  onChange={setBranchSpecialtyUser}
                  branches={filterBranches}
                />
                <ListRevenueData
                  title={t('revenues')}
                  data={revenues}
                  onEdit={revenue => {
                    editRevenueForm.setFormValue(R.pick(ENTITY_PROPS)(revenue));
                    editRevenueForm.show();
                  }}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pages={revenuesPages}
                />
                <Div className="flex gap-3 items-center mb-5">
                  <ExpenseFilter
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                  {/* <ExcelIcon
                    onClick={handleExpenseAccountingExcel}
                    className="w-8 h-8 mt-8"
                  /> */}
                </Div>
                <BranchSpecialtyUserFilter
                  formValue={expenseBranchSpecialtyUser}
                  onChange={setExpenseBranchSpecialtyUser}
                  branches={filterBranches}
                />
                <ListExpenseData
                  title={t('expenses')}
                  data={expenses}
                  onEdit={expense => {
                    editExpenseForm.setFormValue(R.pick(ENTITY_PROPS)(expense));
                    editExpenseForm.show();
                  }}
                  currentPage={expenseCurrentPage}
                  setCurrentPage={setExpenseCurrentPage}
                  pages={expensesPages}
                />
                <Profit expenses={totalExpenses} revenues={totalRevenues} />
              </Div>
            </Div>
          ) : (
            <Summary expenses={updatedExpenses} revenues={totalRevenues} />
          )}
        </Div>
        <AccountingForm {...createRevenueForm} loading={createRevenueLoading} />
        <AccountingForm
          {...createExpenseForm}
          loading={createExpensesLoading}
        />
        <AccountingForm {...editRevenueForm} loading={updateRevenueLoading} />
        <AccountingForm {...editExpenseForm} loading={updateExpensesLoading} />
      </CRCard>
    </>
  );
};

AccountingContainer.propTypes = {};

export default memo(AccountingContainer);
