import { useState, useCallback } from 'react';
import * as R from 'ramda';
import {
  Div,
  CRCard,
  H6,
  BranchSpecialtyUserFilter,
  CRButton,
} from 'components';
import Toolbar from '../accounting/toolbar';
import ListData from './list-data';
import Profit from '../accounting/profit';
import { Can } from 'components/user/can';
import { useInsuranceAccounting, useAppointments } from 'hooks';
import Filter from './filter';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import useGlobalState from 'state';
import axios from 'axios';

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

const InsuranceDebitContainer = () => {
  const { t } = useTranslation();
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initialval);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [user] = useGlobalState('user');
  const [checkedKeys, setCheckedKeys] = useState([]);
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
  } = useInsuranceAccounting({
    view,
    period,
    page,
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    companyId: filter.company,
    status: filter.status,
  });
  const handleGatherInsurance = useCallback(() => {
    setCheckedKeys([]);
    gatherInsurance({
      variables: {
        gatherInsuranceData: { ids: checkedKeys },
      },
    });
  }, [checkedKeys, gatherInsurance, setCheckedKeys]);

  const handleRevertInsurance = useCallback(() => {
    setCheckedKeys([]);
    revertInsurance({
      variables: {
        revertInsuranceData: { ids: checkedKeys },
      },
    });
  }, [checkedKeys, revertInsurance, setCheckedKeys]);
  const insurancePages = Math.ceil(InsuranceDebitCount / 20);

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

  return (
    <>
      <CRCard borderless>
        <Div display="flex" justifyContent="space-between">
          <h4>{t('insurance')}</h4>
          <Div>
            <CRButton
              variant="primary"
              onClick={handleInsurranceReport}
              ml={1}
              mr={1}
            >
              {t('print')} +
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleGatherInsurance}
              mr={1}
              disabled={
                filter.status === 'Draft' && checkedKeys.length > 0
                  ? false
                  : true
              }
            >
              {t('gather')} +
            </CRButton>
            <CRButton
              variant="primary"
              onClick={handleRevertInsurance}
              mr={1}
              disabled={
                filter.status === 'Cleared' && checkedKeys.length > 0
                  ? false
                  : true
              }
            >
              {t('revert')} +
            </CRButton>
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
