import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import {
  Div,
  CRCard,
  H6,
  BranchSpecialtyUserFilter,
  CRButton,
  MenuPopover,
} from 'components';
import Toolbar from '../accounting/toolbar';
import ListData from './list-data';
import Profit from '../accounting/profit';
import { Can } from 'components/user/can';
import {
  useInsuranceAccounting,
  useAppointments,
  useModal,
  useDoctor,
  useBankDefinition,
  useCompanyDefinition,
  usePatients,
} from 'hooks';
import Filter from './filter';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import useGlobalState from 'state';
import axios from 'axios';
import NewInsurance from './new-insurance';
import { Whisper } from 'rsuite';

const initialval = {
  company: null,
  status: null,
};
const inialCurrentPage = {
  activePage: 1,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const initialFormValue = {
  companyId: null,
  patientId: null,
  date: null,
  branchId: null,
  specialtyId: null,
  userId: null,
  doctorId: null,
  patientSearchValue: '',
  paymentMethod: 'cash',
  bankId: null,
  cardId: '',
  cardExpiryDate: null,
};

const InsuranceDebitContainer = () => {
  const { t } = useTranslation();
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [period, setPeriod] = useState([]);
  const [type, setType] = useState('');
  const [filter, setFilter] = useState(initialval);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [user] = useGlobalState('user');
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { doctors } = useDoctor({});
  const { banksDefinition } = useBankDefinition({});
  const { companysDefinition } = useCompanyDefinition({});
  const { searchedPatients } = usePatients({
    patientSearchValue: formValue.patientSearchValue,
  });
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const { filterBranches } = useAppointments({
    action: ACTIONS.ViewInsurance_Accounting,
  });
  const page = currentPage?.activePage;
  const {
    insuranceTransactions,
    totalInsuranceDebit,
    InsuranceDebitCount,
    timeFrame,
    gatherInsurance,
    revertInsurance,
    refuseInsurance,
    addNewInsurance,
    editInsurance,
  } = useInsuranceAccounting({
    view,
    period,
    page,
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    companyId: filter.company,
    status: filter.status,
    onAddInsurance: () => {
      close();
      setFormValue(initialFormValue);
    },
  });
  const insurancePages = Math.ceil(InsuranceDebitCount / 20);
  const handleAddNewInsurance = useCallback(() => {
    open();
    setType('addNewInsurance');
    setFormValue(initialFormValue);
  }, [open, setType, setFormValue]);
  const handleEditInsurance = useCallback(
    ({ id, name, amount, company }) => {
      setType('edit');
      setFormValue({
        id: id,
        name: name,
        totalAmount: amount,
        companyId: company?.id,
      });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleGatherInsurance = useCallback(() => {
    gatherInsurance({
      variables: {
        gatherInsuranceData: { ids: checkedKeys },
      },
    });
    setCheckedKeys([]);
  }, [checkedKeys, gatherInsurance, setCheckedKeys]);
  const handleRefuseInsurance = useCallback(() => {
    refuseInsurance({
      variables: {
        refuseInsuranceData: { ids: checkedKeys },
      },
    });
    setCheckedKeys([]);
  }, [checkedKeys, setCheckedKeys, refuseInsurance]);

  const handleRevertInsurance = useCallback(() => {
    revertInsurance({
      variables: {
        revertInsuranceData: { ids: checkedKeys },
      },
    });
    setCheckedKeys([]);
  }, [checkedKeys, revertInsurance, setCheckedKeys]);
  const handleAdd = useCallback(() => {
    const { patientSearchValue, ...rest } = formValue;
    if (type === 'addNewInsurance') {
      const finalForm = {
        ...rest,
        name: '',
        sessions: selectedSessions.map(session => ({
          name: session?.name,
          price: session.price,
          number: session.number,
          id: session?.id,
          patientFees: session?.patientFees || 0,
          feesCalType: session?.type,
          companyId: session?.companyId,
        })),
      };
      addNewInsurance({ variables: { insurance: finalForm } });
    } else {
      editInsurance({
        variables: {
          insurance: {
            id: formValue.id,
            name: formValue.name,
            amount: formValue.totalAmount,
            sessionId: formValue?.session?.id,
          },
        },
      });
    }
  }, [addNewInsurance, editInsurance, type, formValue, selectedSessions]);

  const handleInsurranceReport = () => {
    axios({
      url: '/reports/insurance',
      method: 'POST',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        companyId: filter?.company,
        organizationId: user.organizationId,
        view,
        status: filter?.status,
        dateFrom: period[0],
        dateTo: period[1],
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'insurrance.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  const handleInsurranceExcel = async day => {
    axios({
      url: '/insurance/excel',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        companyId: filter?.company,
        organizationId: user.organizationId,
        view,
        status: filter?.status,
        dateFrom: period[0],
        dateTo: period[1],
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Insurance-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };

  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? handleInsurranceReport() : handleInsurranceExcel();
  }

  return (
    <>
      <CRCard borderless>
        <Div display="flex" justifyContent="space-between">
          <h4>{t('insurance')}</h4>
          <Div>
            <CRButton
              variant="primary"
              onClick={handleGatherInsurance}
              mr={1}
              disabled={checkedKeys.length > 0 ? false : true}
            >
              {t('gather')}
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleRefuseInsurance}
              mr={1}
              disabled={checkedKeys.length > 0 ? false : true}
            >
              {t('refuse')}
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleRevertInsurance}
              mr={1}
              disabled={checkedKeys.length > 0 ? false : true}
            >
              {t('revert')}
            </CRButton>
            <CRButton variant="primary" onClick={handleAddNewInsurance} mr={1}>
              {t('addNewInsurance')}
            </CRButton>
            <Whisper
              placement="bottomStart"
              trigger="click"
              speaker={<MenuPopover onSelect={handleSelectMenu} />}
            >
              <CRButton>Prints</CRButton>
            </Whisper>
          </Div>
        </Div>
        <div className="flex flex-wrap items-center gap-4">
          <Can I="ViewFilters" an="Accounting">
            <Toolbar
              activeKey={view}
              onSelect={setView}
              data={{ insuranceTransactions }}
              onChangePeriod={setPeriod}
            />

            <Div display="flex" my={4}>
              <H6>{t('showingFor')}:</H6>
              <H6 variant="primary" ml={2} fontWeight="bold">
                {formatDate(R.head(timeFrame))} -{' '}
                {formatDate(R.last(timeFrame))}
              </H6>
            </Div>
          </Can>
        </div>
        <Div>
          <Filter formValue={filter} setFormValue={setFilter} />
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
                title={t('insuranceTransactions')}
                data={insuranceTransactions}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={insurancePages}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                onEditInsurance={handleEditInsurance}
              />
              <Profit expenses={0} revenues={totalInsuranceDebit} />
            </Div>
          </Div>
        </Div>
        <NewInsurance
          visible={visible}
          formValue={formValue}
          onChange={setFormValue}
          onOk={handleAdd}
          onClose={close}
          type={type}
          doctors={doctors}
          companysDefinition={companysDefinition}
          banksDefinition={banksDefinition}
          searchedPatients={searchedPatients}
          t={t}
          selectedSessions={selectedSessions}
          setSelectedSessions={setSelectedSessions}
        />
      </CRCard>
    </>
  );
};

export default InsuranceDebitContainer;
