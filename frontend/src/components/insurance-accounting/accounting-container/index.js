import { useState } from 'react';
import * as R from 'ramda';
import {
  Div,
  CRCard,
  H6,
  BranchSpecialtyUserFilter,
  CRButton,
} from 'components';
import Toolbar from '../../accounting/toolbar';
import ListData from './list-data';
import Profit from '../../accounting/profit';
import { Can } from 'components/user/can';
import { useInsuranceAccounting, useAppointments } from 'hooks';
import Filter from './filter';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import useGlobalState from 'state';
import { ExcelIcon } from 'components/icons/index';
import axios from 'axios';

const initialval = {
  company: null,
};
const inialCurrentPage = {
  activePage: 1,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const InsuranceDebitContainer = () => {
  const { t } = useTranslation();
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initialval);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [user, setUser] = useGlobalState('user');
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
  } = useInsuranceAccounting({
    view,
    period,
    page,
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    companyId: filter.company,
  });

  // const { pageSetupData } = useConfigurations();
  const insurancePages = Math.ceil(InsuranceDebitCount / 20);

  const handleInsurranceReport = () => {
    axios({
      url: '/insurranceReport',
      method: 'POST',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        companyId: filter?.company,
        organizationId: user.organizationId,
        view,
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
  ///
  const handleInsurranceExcel = async () => {
    axios({
      url: '/insurranceExcel',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        companyId: filter?.company,
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
        link.setAttribute('download', `insurrance-debit-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };

  return (
    <>
      <CRCard borderless>
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
          <CRButton
            variant="primary"
            onClick={handleInsurranceReport}
            ml={1}
            mr={1}
          >
            {t('print')} +
          </CRButton>
          <ExcelIcon
            variant="primary"
            onClick={handleInsurranceExcel}
            ml={1}
            mr={1}
            width="30px"
            height="30px"
            marginTop="40px"
          />
        </div>
        <Filter formValue={filter} setFormValue={setFilter} />
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
              />
              <Profit expenses={0} revenues={totalInsuranceDebit} />
            </Div>
          </Div>
        </Div>
      </CRCard>
    </>
  );
};

export default InsuranceDebitContainer;
