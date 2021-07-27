import React, { useState, useCallback, useMemo } from 'react';
import * as R from 'ramda';
import { MainContainer, Div, CRCard, H6 } from 'components';
import Toolbar from '../../accounting/toolbar';
import ListData from './list-data';
import Profit from '../../accounting/profit';
import { useInsuranceAccounting, useAppointments } from 'hooks';
import Filter from './filter';
import BranchFilter from '../../filters';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import PdfView from './pdf';
import { formatDate } from 'utils/date';
const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initialval = {
  company: '',
};
const BankAccountingContainer = () => {
  const [view, setView] = useState(ACCOUNTING_VIEWS.WEEK);
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initialval);
  const { filterBranches } = useAppointments({});
  const { revenues, timeFrame } = useInsuranceAccounting({
    view,
    period,
  });
  const updatedRevenues = useMemo(
    () =>
      revenues.filter(r =>
        r.company.name.toLowerCase().includes(filter.company.toLowerCase())
      ),
    [filter, revenues]
  );
  return (
    <>
      <MainContainer
        title="Insurance"
        more={
          <Div display="flex">
            <Div ml={1}>
              <PdfView
                data={{ revenues: updatedRevenues, expenses: [] }}
                period={timeFrame}
              />
            </Div>
          </Div>
        }
        nobody
      ></MainContainer>
      <CRCard borderless>
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
        <Filter formValue={filter} setFormValue={setFilter} />
        <Div>
          <Div display="flex">
            <Div flexGrow={1} mr={2}>
              <BranchFilter
                appointments={updatedRevenues}
                branches={filterBranches}
                type="accounting"
                method="revenues"
                render={(revenues, totalRevenues) => (
                  <>
                    <ListData title="Insurance Revenues" data={revenues} />
                    <Profit expenses={0} revenues={totalRevenues} />
                  </>
                )}
              />
            </Div>
          </Div>
        </Div>
      </CRCard>
    </>
  );
};

export default BankAccountingContainer;
