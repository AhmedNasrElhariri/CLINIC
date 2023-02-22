import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import {
  MainContainer,
  Div,
  CRCard,
  H6,
  CRButton,
  BranchSpecialtyUserFilter,
  CRSelectInput,
  MenuPopover,
} from 'components';
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
  useBankDefinition,
  useExpenseTypeDefinition,
} from 'hooks';
import Filter from './filter';
import { ACCOUNTING_VIEWS, ACTIONS, ACCOUNT_OPTIONS } from 'utils/constants';
import { Can } from 'components/user/can';
import { formatDate } from 'utils/date';
import axios from 'axios';
import useGlobalState from 'state';
import { Form, Whisper } from 'rsuite';

const initalFilterVal = {
  expenseType: '',
  revenueName: '',
  bank: null,
  accountingOption: 'All',
};
const initValue = {
  id: null,
  amount: 0,
  bankId: null,
  checkNumber: '',
  invoiceNo: '',
  expenseType: '',
  expenseName: '',
  date: null,
  name: '',
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
const inialCurrentPage = {
  activePage: 1,
};
const inialExpenseCurrentPage = {
  activePage: 1,
};
const BankAccountingContainer = () => {
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [action, setAction] = useState('');
  const [user] = useGlobalState('user');
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const { formValue, setFormValue, type, setType, show, setShow } = useForm({
    initValue,
  });
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initalFilterVal);
  const [refetchRe, setRefetchRe] = useState(false);
  const [refetchEx, setRefetchEx] = useState(false);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [expenseCurrentPage, setExpenseCurrentPage] = useState(
    inialExpenseCurrentPage
  );
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const [expenseBranchSpecialtyUser, setExpenseBranchSpecialtyUser] = useState(
    initialExpenseBranchValue
  );
  const { banksDefinition } = useBankDefinition({});
  const { expenseTypesDefinition } = useExpenseTypeDefinition({});
  const updatedexpenseType = expenseTypesDefinition.map(e => {
    return {
      id: e.name,
      name: e.name,
    };
  });
  const page = currentPage?.activePage;
  const expensePage = expenseCurrentPage?.activePage;
  const { filterBranches } = useAppointments({
    action: ACTIONS.ViewBank_Accounting,
  });
  const {
    revenues,
    expenses,
    totalRevenues,
    totalExpenses,
    RevenuesCount,
    expensesCount,
    timeFrame,
    editBankRevenue,
    createBankRevenue,
    createBankExpense,
    editBankExpense,
  } = useBankAccounting({
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
    bankId: filter?.bank,
    revenueName: filter?.revenueName,
    accountingOption: filter?.accountingOption,
    expenseName: formValue?.expenseName,
    expenseType: formValue?.expenseType,
    refetchRe: refetchRe,
    setRefetchRe: setRefetchRe,
    refetchEx: refetchEx,
    setRefetchEx: setRefetchEx,
    onEdit: () => {
      close();
    },
    onCreateBankRe: () => {
      close();
      setFormValue(initValue);
      setRefetchRe(true);
    },
    onCreateBankEx: () => {
      close();
      setFormValue(initValue);
      setRefetchEx(true);
    },
  });

  const revenuesPages = Math.ceil(RevenuesCount / 20);
  const expensesPages = Math.ceil(expensesCount / 20);

  const handleClickEditRevenue = useCallback(
    data => {
      const { bank } = data;
      const row = R.pick(['id', 'amount', 'name', 'date', 'checkNumber'])(data);
      setType('editBankRevenue');
      setAction(ACTIONS.EditBankRevenue_Accounting);
      setFormValue({ ...row, bankId: bank.id });
      open();
    },
    [open, setFormValue, setType, setAction]
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
      setAction(ACTIONS.EditBankExpense_Accounting);
      setFormValue({ ...row, bankId: bank.id });
      open();
    },
    [open, setFormValue, setType, setAction]
  );
  const handleClickCreateRevenue = useCallback(() => {
    setType('createBankRevenue');
    setAction(ACTIONS.AddBankRevenue_Accounting);
    open();
  }, [open, setType, setAction]);
  const handleClickCreateExpense = useCallback(() => {
    setType('createBankExpense');
    setAction(ACTIONS.AddBankExpense_Accounting);
    open();
  }, [open, setType, setAction]);

  const handleAdd = useCallback(() => {
    if (type === 'editBankRevenue') {
      editBankRevenue({
        variables: {
          bankTransition: formValue,
        },
      });
    } else if (type === 'createBankRevenue') {
      const { id, expenseType, expenseName, ...rest } = formValue;
      createBankRevenue({
        variables: {
          bankTransition: rest,
        },
      });
    } else if (type === 'createBankExpense') {
      const { id, expenseName, ...rest } = formValue;
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

  const handleBankAccountingReport = () => {
    const { paramValue } = ACCOUNT_OPTIONS.find(
      ({ id }) => id === filter.accountingOption
    );
    axios({
      url: '/bankAccountingReport',
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
        bankId: filter?.bank,
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
        link.setAttribute('download', 'visaAccounting.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  ///
  const handleBankAccountingExcel = async day => {
    const { paramValue } = ACCOUNT_OPTIONS.find(
      ({ id }) => id === filter.accountingOption
    );
    axios({
      url: '/accountingBankExcel',
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
        bankId: filter?.bank,
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
        link.setAttribute('download', `bank-revenues-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };

  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? handleBankAccountingReport() : handleBankAccountingExcel();
  }
  return (
    <>
      <MainContainer
        title={t('bankAccounting')}
        more={
          <Div display="flex" mt={20}>
            <>
              <Can I="AddBankRevenue" an="Accounting">
                <CRButton
                  variant="primary"
                  onClick={() => handleClickCreateRevenue()}
                  ml={1}
                  mr={1}
                >
                  {t('newRevenue')} +
                </CRButton>
              </Can>
              <Can I="AddBankExpense" an="Accounting">
                <CRButton
                  variant="primary"
                  ml={1}
                  mr={1}
                  onClick={() => handleClickCreateExpense()}
                >
                  {t('newExpense')} +
                </CRButton>
              </Can>
              <Whisper
                placement="bottomStart"
                trigger="click"
                speaker={<MenuPopover onSelect={handleSelectMenu} />}
              >
                <CRButton>Prints</CRButton>
              </Whisper>
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
          <Form>
            <CRSelectInput
              data={ACCOUNT_OPTIONS}
              name="accountOption"
              block
              value={filter.accountingOption}
              onChange={val => setFilter({ ...filter, accountingOption: val })}
              style={{ width: '170px' }}
            />
          </Form>
          <Div display="flex" my={4}>
            <H6>{t('showingFor')} :</H6>
            <H6 variant="primary" ml={2} fontWeight="bold">
              {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
            </H6>
          </Div>
        </Can>
        <Div display="flex">
          <Filter
            formValue={filter}
            setFormValue={setFilter}
            banksDefinition={banksDefinition}
          />
        </Div>
        <Div>
          <Div display="flex">
            <Div flexGrow={1} mr={2}>
              <BranchSpecialtyUserFilter
                formValue={branchSpecialtyUser}
                onChange={setBranchSpecialtyUser}
                branches={filterBranches}
              />
              <ListData
                title={t('bankingRevenues')}
                data={revenues}
                onEdit={handleClickEditRevenue}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={revenuesPages}
              />
              <Div display="flex">
                <ExpenseFilter
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
              </Div>
              <BranchSpecialtyUserFilter
                formValue={expenseBranchSpecialtyUser}
                onChange={setExpenseBranchSpecialtyUser}
                branches={filterBranches}
              />
              <ListExpenseData
                title={t('bankingExpenses')}
                data={expenses}
                onEdit={handleClickEditExpense}
                currentPage={expenseCurrentPage}
                setCurrentPage={setExpenseCurrentPage}
                pages={expensesPages}
              />
              <Profit expenses={totalExpenses} revenues={totalRevenues} />
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
          show={show}
          setShow={setShow}
          action={action}
        />
      </CRCard>
    </>
  );
};

export default BankAccountingContainer;
