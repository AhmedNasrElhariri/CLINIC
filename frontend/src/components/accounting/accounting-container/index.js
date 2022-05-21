import React, { useState, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';
import { ACTIONS } from 'utils/constants';
import {
  MainContainer,
  Div,
  CRCard,
  CRButton,
  H6,
  BranchSpecialtyUserFilter,
} from 'components';
import Toolbar from '../toolbar';
import ListExpenseData from '../list-data/expense.js';
import ListRevenueData from '../list-data/revenue.js';
import Tabs from '../tabs';
import Profit from '../profit';
import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
import { useAccounting, useAppointments, useConfigurations } from 'hooks';
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
  const [activeTab, setActiveTab] = useState('0');
  const { filterBranches } = useAppointments({
    action: ACTIONS.View_Accounting,
  });
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
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
  const { pageSetupData } = useConfigurations();
  const pageSetupRow = pageSetupData.find(
    element => element.type === 'accounting'
  );
  const marginTop = pageSetupRow?.top * 37.7952755906 || 0;
  const marginRight = pageSetupRow?.right * 37.7952755906 || 0;
  const marginBottom = pageSetupRow?.bottom * 37.7952755906 || 0;
  const marginLeft = pageSetupRow?.left * 37.7952755906 || 0;
  const [createExpense, { loading: createExpensesLoading }] = useMutation(
    CREATE_EXPENSE,
    {
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
    }
  );

  const [createRevenue, { loading: createRevenueLoading }] = useMutation(
    CREATE_REVENUE,
    {
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
    }
  );

  const [updateExpense, { loading: updateExpensesLoading }] = useMutation(
    UPDATE_EXPENSE,
    {
      onCompleted({ updateExpense: expnese }) {
        Alert.success('Expense has been updated Successfully');
        editExpenseForm.hide();
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
      },
      onError() {
        Alert.error('Failed to update Revenue');
      },
    }
  );

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
    totalRevenues,
    totalExpenses,
    RevenuesCount,
    expensesCount,
    timeFrame,
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
    expenseType: formValue?.expenseType,
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
              <PdfView
                data={{ revenues, expenses, totalRevenues, totalExpenses }}
                period={timeFrame}
                marginTop={marginTop}
                marginRight={marginRight}
                marginBottom={marginBottom}
                marginLeft={marginLeft}
              />
            </>
          </Div>
        }
        nobody
      ></MainContainer>
      <Tabs onSelect={setActiveTab} activeTab={activeTab} />
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
          <Div display="flex" my={4}>
            <H6>Showing for :</H6>
            <H6 variant="primary" ml={2} fontWeight="bold">
              {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
            </H6>
          </Div>
        </Can>
        <Div>
          {activeTab === '0' ? (
            <Div display="flex">
              <Div flexGrow={1} mr={2}>
                <RevenueFilter
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
                <BranchSpecialtyUserFilter
                  formValue={branchSpecialtyUser}
                  onChange={setBranchSpecialtyUser}
                  branches={filterBranches}
                />
                <ListRevenueData
                  title="Revenues"
                  data={revenues}
                  onEdit={revenue => {
                    editRevenueForm.setFormValue(R.pick(ENTITY_PROPS)(revenue));
                    editRevenueForm.show();
                  }}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pages={revenuesPages}
                />
                <ExpenseFilter
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
                <BranchSpecialtyUserFilter
                  formValue={expenseBranchSpecialtyUser}
                  onChange={setExpenseBranchSpecialtyUser}
                  branches={filterBranches}
                />
                <ListExpenseData
                  title="Expenses"
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
                {/* <BranchFilter
                  appointments={updatedRevenues}
                  type="accounting"
                  method="revenues"
                  branches={filterBranches}
                  render={(revenues, totalRevenues) => (
                    <>
                      <ListRevenueData
                        title="Revenues"
                        data={revenues}
                        onEdit={revenue => {
                          editRevenueForm.setFormValue(
                            R.pick(ENTITY_PROPS)(revenue)
                          );
                          editRevenueForm.show();
                        }}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        // pages={pages}
                      />
                      <Div flexGrow={1} ml={2}>
                        <ExpenseFilter
                          formValue={formValue}
                          setFormValue={setFormValue}
                        />
                        <BranchFilter
                          appointments={updatedExpenses}
                          type="accounting"
                          method="expenses"
                          branches={filterBranches}
                          render={(expenses, __, totalExpenses) => (
                            <>
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
                              <Profit
                                expenses={totalExpenses}
                                revenues={totalRevenues}
                              />
                              <Div
                                mt={10}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <PdfView
                                  data={{ revenues, expenses }}
                                  period={timeFrame}
                                  marginTop={marginTop}
                                  marginRight={marginRight}
                                  marginBottom={marginBottom}
                                  marginLeft={marginLeft}
                                />
                              </Div>
                            </>
                          )}
                        />
                      </Div>
                    </>
                  )}
                /> */}
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

export default AccountingContainer;
