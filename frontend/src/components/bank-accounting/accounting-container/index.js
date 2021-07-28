import React, { useState, useMemo } from 'react';

import * as R from 'ramda';
import { MainContainer, Div, CRCard, H6 } from 'components';
import Toolbar from '../../accounting/toolbar';
import ListData from './list-data';
import Profit from '../../accounting/profit';
import { useBankAccounting, useAppointments } from 'hooks';
import Filter from './filter';
import BranchFilter from '../../filters';
import { ACCOUNTING_VIEWS } from 'utils/constants';

import PdfView from './pdf';
import { formatDate } from 'utils/date';
const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initialval = {
  bank: '',
};
const BankAccountingContainer = () => {
  const [view, setView] = useState(ACCOUNTING_VIEWS.WEEK);
  const [period, setPeriod] = useState([]);
  const [filter, setFilter] = useState(initialval);
  const { filterBranches } = useAppointments({});
  const { revenues, timeFrame } = useBankAccounting({
    view,
    period,
  });
  const updatedRevenues = useMemo(
    () =>
      revenues.filter(r =>
        r.bank.name.toLowerCase().includes(filter.bank.toLowerCase())
      ),
    [filter, revenues]
  );
  return (
    <>
      <MainContainer title="Banking" nobody></MainContainer>
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
                type="accounting"
                method="revenues"
                branches={filterBranches}
                render={(revenues, totalRevenues) => (
                  <>
                    <ListData title="Banking Revenues" data={revenues} />
                    <Profit expenses={0} revenues={totalRevenues} />
                    <Div
                      mt={10}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <PdfView
                        data={{ revenues, expenses:[] }}
                        period={timeFrame}
                      />
                    </Div>
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
