import React, { useState, useMemo, useCallback } from 'react';

import * as R from 'ramda';
import { MainContainer, Div, CRCard, H6, CRButton } from 'components';
import Toolbar from '../../accounting/toolbar';
import ListData from './list-data/revenue';
import ListExpenseData from './list-data/expense';
import Profit from '../../accounting/profit';
import BankModel from '../bank-model';
import ExpenseFilter from '../../accounting/filter/expense-filter';
import {
  useBankAccounting,
  useAppointments,
  useModal,
  useForm,
  useConfigurations,
  useBankDefinition,
  useExpenseTypeDefinition,
} from 'hooks';
import Filter from './filter';
import BranchFilter from '../../filters';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { Can } from 'components/user/can';
import PdfView from './pdf';
import { formatDate } from 'utils/date';
const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initalFilterVal = {
  expenseType: '',
  revenueName: '',
  bank: null,
};
const initValue = {
  id: null,
  amount: 0,
  bankId: null,
  checkNumber: '',
  invoiceNo: '',
  expenseType: '',
  date: null,
  name: '',
};
const BankAccountingContainer = () => {
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const { visible, open, close } = useModal();
  const {
    formValue,
    setFormValue,
    type,
    setType,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue,
  });
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initalFilterVal);
  const { pageSetupData } = useConfigurations();
  const { banksDefinition } = useBankDefinition({});
  const { expenseTypesDefinition } = useExpenseTypeDefinition({});
  const updatedexpenseType = expenseTypesDefinition.map(e => {
    return {
      id: e.name,
      name: e.name,
    };
  });
  const pageSetupRow = pageSetupData.find(element => element.type === 'visa');
  const marginTop = pageSetupRow?.top * 37.7952755906 || 0;
  const marginRight = pageSetupRow?.right * 37.7952755906 || 0;
  const marginBottom = pageSetupRow?.bottom * 37.7952755906 || 0;
  const marginLeft = pageSetupRow?.left * 37.7952755906 || 0;
  const { filterBranches } = useAppointments({
    action: ACTIONS.ViewBank_Accounting,
  });
  const {
    revenues,
    expenses,
    timeFrame,
    editBankRevenue,
    createBankRevenue,
    createBankExpense,
    editBankExpense,
  } = useBankAccounting({
    view,
    period,
    onEdit: () => {
      close();
    },
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
  });

  const updatedRevenues = useMemo(() => {
    if (filter.bank == null) {
      return revenues;
    } else {
      return revenues.filter(r => r.bank.id == filter.bank);
    }
  }, [filter, revenues]);
  console.log(revenues, 'RRRRR', filter);
  const updatedExpenses = useMemo(
    () =>
      expenses.filter(e =>
        e.expenseType.toLowerCase().includes(filter.expenseType.toLowerCase())
      ),
    [filter, expenses]
  );
  const handleClickEditRevenue = useCallback(
    data => {
      const { bank } = data;
      const row = R.pick(['id', 'amount', 'name', 'date', 'checkNumber'])(data);
      setType('editBankRevenue');
      setFormValue({ ...row, bankId: bank.id });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditExpense = useCallback(
    data => {
      const { bank } = data;
      const row = R.pick([
        'id',
        'amount',
        'name',
        'expenseType',
        'date',
        'checkNumber',
      ])(data);
      setType('editBankExpense');
      setFormValue({ ...row, bankId: bank.id });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickCreateRevenue = useCallback(() => {
    setType('createBankRevenue');
    open();
  }, [open, setType]);
  const handleClickCreateExpense = useCallback(() => {
    setType('createBankExpense');
    open();
  }, [open, setType]);

  const handleAdd = useCallback(() => {
    if (type === 'editBankRevenue') {
      editBankRevenue({
        variables: {
          bankTransition: formValue,
        },
      });
    } else if (type === 'createBankRevenue') {
      const { id, expenseType, ...rest } = formValue;
      createBankRevenue({
        variables: {
          bankTransition: rest,
        },
      });
    } else if (type === 'createBankExpense') {
      const { id, ...rest } = formValue;
      createBankExpense({
        variables: {
          bankTransition: rest,
        },
      });
    } else if (type === 'editBankExpense') {
      editBankExpense({
        variables: {
          bankTransition: formValue,
        },
      });
    }
  }, [
    editBankRevenue,
    createBankRevenue,
    editBankExpense,
    createBankExpense,
    formValue,
    type,
  ]);
  return (
    <>
      <MainContainer
        title="Banking Accounting"
        more={
          <Div display="flex" mt={20}>
            <>
              <Can I="AddRevenue" an="Accounting">
                <CRButton
                  variant="primary"
                  onClick={() => handleClickCreateRevenue()}
                >
                  Reveneue +
                </CRButton>
              </Can>
              <Can I="AddExpense" an="Accounting">
                <CRButton
                  variant="primary"
                  ml={1}
                  onClick={() => handleClickCreateExpense()}
                >
                  Expense +
                </CRButton>
              </Can>
            </>
          </Div>
        }
        nobody
      ></MainContainer>
      <CRCard borderless>
        <Can I="ViewFilters" an="Accounting">
          <Toolbar
            activeKey={view}
            onSelect={setView}
            data={{ revenues, revenues }}
            onChangePeriod={setPeriod}
          />

          <Div display="flex" my={4}>
            <H6>Showing for :</H6>
            <H6 variant="primary" ml={2} fontWeight="bold">
              {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
            </H6>
          </Div>
        </Can>
        <Filter
          formValue={filter}
          setFormValue={setFilter}
          banksDefinition={banksDefinition}
        />
        <Div>
          <Div display="flex">
            <Div flexGrow={1} mr={2}>
              <BranchFilter
                appointments={updatedRevenues}
                type="accounting"
                method="revenues"
                branches={filterBranches}
                render={(revenues, totalRevenues) => (
                  <>
                    <ListData
                      title="Banking Revenues"
                      data={revenues}
                      onEdit={handleClickEditRevenue}
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
                              onEdit={handleClickEditExpense}
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
              />
            </Div>
          </Div>
        </Div>
        <BankModel
          visible={visible}
          formValue={formValue}
          onChange={setFormValue}
          onOk={handleAdd}
          onClose={close}
          type={type}
          banksDefinition={banksDefinition}
          updatedexpenseType={updatedexpenseType}
          // checkResult={checkResult}
          // validate={validate}
          show={show}
          setShow={setShow}
          // loading={loading}
        />
      </CRCard>
    </>
  );
};

export default BankAccountingContainer;
