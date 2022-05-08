import React, { useState, useMemo } from 'react';
import * as R from 'ramda';
import {
  MainContainer,
  Div,
  CRCard,
  H6,
  BranchSpecialtyUserFilter,
} from 'components';
import Toolbar from '../../accounting/toolbar';
import ListData from './list-data';
import Profit from '../../accounting/profit';
import { Can } from 'components/user/can';
import {
  useInsuranceAccounting,
  useAppointments,
  useConfigurations,
} from 'hooks';
import Filter from './filter';
import BranchFilter from '../../filters';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import PdfView from './pdf';
import { formatDate } from 'utils/date';
const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initialval = {
  company: '',
};
const inialCurrentPage = {
  activePage: 1,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const BankAccountingContainer = () => {
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initialval);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const { filterBranches } = useAppointments({
    action: ACTIONS.ViewInsurance_Accounting,
  });
  const page = currentPage?.activePage;
  const { revenues, totalRevenues, RevenuesCount, timeFrame } =
    useInsuranceAccounting({
      view,
      period,
      page,
      branchId: branchSpecialtyUser?.branch,
      specialtyId: branchSpecialtyUser?.specialty,
      doctorId: branchSpecialtyUser?.doctor,
    });
  const { pageSetupData } = useConfigurations();
  const revenuesPages = Math.ceil(RevenuesCount / 20);
  const pageSetupRow = pageSetupData.find(
    element => element.type === 'accounting'
  );
  const marginTop = pageSetupRow?.top * 37.7952755906 || 0;
  const marginRight = pageSetupRow?.right * 37.7952755906 || 0;
  const marginBottom = pageSetupRow?.bottom * 37.7952755906 || 0;
  const marginLeft = pageSetupRow?.left * 37.7952755906 || 0;
  const updatedRevenues = useMemo(
    () =>
      revenues.filter(r =>
        r.company.name.toLowerCase().includes(filter.company.toLowerCase())
      ),
    [filter, revenues]
  );
  return (
    <>
      <MainContainer title="Insurance" nobody></MainContainer>
      <CRCard borderless>
        <Div display="flex" justifyContent="space-between">
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
                {formatDate(R.head(timeFrame))} -{' '}
                {formatDate(R.last(timeFrame))}
              </H6>
            </Div>
          </Can>
          <PdfView
            data={{ revenues, expenses: [], totalRevenues }}
            period={timeFrame}
            marginTop={marginTop}
            marginRight={marginRight}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
          />
        </Div>
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
                title="Insurance Revenues"
                data={revenues}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={revenuesPages}
              />
              <Profit expenses={0} revenues={totalRevenues} />
              {/* <BranchFilter
                appointments={updatedRevenues}
                branches={filterBranches}
                type="accounting"
                method="revenues"
                render={(revenues, totalRevenues) => (
                  <>
                    <ListData title="Insurance Revenues" data={revenues} />
                    <Profit expenses={0} revenues={totalRevenues} />
                    <Div
                      mt={10}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <PdfView
                        data={{ revenues, expenses: [] }}
                        period={timeFrame}
                        marginTop={marginTop}
                        marginRight={marginRight}
                        marginBottom={marginBottom}
                        marginLeft={marginLeft}
                      />
                    </Div>
                  </>
                )}
              /> */}
            </Div>
          </Div>
        </Div>
      </CRCard>
    </>
  );
};

export default BankAccountingContainer;
