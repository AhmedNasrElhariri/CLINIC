import { useState, memo, useCallback } from 'react';
import * as R from 'ramda';
import { ACTIONS } from 'utils/constants';
import {
  Div,
  CRCard,
  CRButton,
  H6,
  BranchSpecialtyUserFilter,
  MenuPopover,
  Total,
} from 'components';
import Toolbar from '../accounting/toolbar';
import ListData from './list-data';
// import Profit from '../profit';
import {
  useAccounting,
  useAppointments,
  useBankDefinition,
  useGeneralHook,
} from 'hooks';

import { Can } from 'components/user/can';
import Filter from './filter';
import { ACCOUNTING_VIEWS } from 'utils/constants';
// import Summary from '../summary';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useGlobalState from 'state';
import { Form, Whisper } from 'rsuite';
import { getPdfReport } from 'services/reports';

const initalVal = {
  name: '',
  transactionType: 'revenue',
  accountingOption: null,
  bankId: null,
};
const inialCurrentPage = {
  activePage: 1,
};

const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};

const AccountingContainer = () => {
  const activeTab = '0';
  const [user] = useGlobalState('user');
  const { t } = useTranslation();
  const { filterBranches } = useAppointments({
    action: ACTIONS.View_Accounting,
  });
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [period, setPeriod] = useState([]);
  const { timeFrame } = useGeneralHook({ view, period });
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const [formValue, setFormValue] = useState(initalVal);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { banksDefinition } = useBankDefinition({});
  const { accountingTransations, accountingTotal, accountingCount } =
    useAccounting({
      view,
      period,
      page,
      branchId: branchSpecialtyUser?.branch,
      specialtyId: branchSpecialtyUser?.specialty,
      doctorId: branchSpecialtyUser?.doctor,
      name: formValue?.name,
      accountingOption: formValue?.accountingOption,
      transactionType: formValue.transactionType,
      bankId: formValue?.bankId,
    });
  console.log(formValue,'FF')
  const pages = Math.ceil(accountingCount / 20);
  const totals = {
    total: accountingTotal,
  };

  const handleAccountingReport = useCallback(() => {
    const params = {
      view,
      period,
      page,
      branchId: branchSpecialtyUser?.branch,
      specialtyId: branchSpecialtyUser?.specialty,
      doctorId: branchSpecialtyUser?.doctor,
      name: formValue?.name,
      accountingOption: formValue?.accountingOption,
      transactionType: formValue.transactionType,
      bankId: formValue?.bankId,
      organizationId: user.organizationId,
    };
    getPdfReport('/allAccounting', params, 'all accounting.pdf');
  }, [getPdfReport,branchSpecialtyUser,formValue]);

  const handleAccountingExcel = async day => {
    axios({
      url: '/allAccountingExcel',
      responseType: 'blob', // important
      params: {
        view,
        period,
        page,
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        name: formValue?.name,
        accountingOption: formValue?.accountingOption,
        transactionType: formValue.transactionType,
        bankId: formValue?.bankId,
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
          <Whisper
            placement="bottomStart"
            trigger="click"
            speaker={<MenuPopover onSelect={handleSelectMenu} />}
          >
            <CRButton>Prints</CRButton>
          </Whisper>
        </div>
      </div>

      <CRCard borderless>
        <Can I="ViewFilters" an="Accounting">
          <Toolbar
            activeKey={view}
            onSelect={setView}
            onChangePeriod={setPeriod}
          />
          <Form></Form>
          <Div display="flex" my={4}>
            <H6>{t('showingFor')} :</H6>
            <H6 variant="primary" ml={2} fontWeight="bold">
              {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
            </H6>
          </Div>
        </Can>

        <Div>
          {activeTab === '0' && (
            <Div display="flex">
              <Div flexGrow={1} mr={2}>
                <Div display="flex">
                  <Filter
                    formValue={formValue}
                    setFormValue={setFormValue}
                    t={t}
                    banksDefinition={banksDefinition}
                  />
                </Div>
                <BranchSpecialtyUserFilter
                  formValue={branchSpecialtyUser}
                  onChange={setBranchSpecialtyUser}
                  branches={filterBranches}
                />
                <ListData
                  title={t('data')}
                  data={accountingTransations}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pages={pages}
                />
                <Total totals={totals} />
              </Div>
            </Div>
          )}
        </Div>
      </CRCard>
    </>
  );
};

AccountingContainer.propTypes = {};

export default memo(AccountingContainer);
