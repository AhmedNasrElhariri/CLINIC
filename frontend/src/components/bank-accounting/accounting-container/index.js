import React, { useState, useMemo, useCallback } from 'react';

import * as R from 'ramda';
import { MainContainer, Div, CRCard, H6 } from 'components';
import Toolbar from '../../accounting/toolbar';
import ListData from './list-data';
import Profit from '../../accounting/profit';
import BankModel from '../bank-model';
import { useBankAccounting, useAppointments, useModal, useForm } from 'hooks';
import Filter from './filter';
import BranchFilter from '../../filters';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { Can } from 'components/user/can';
import PdfView from './pdf';
import { formatDate } from 'utils/date';
const ENTITY_PROPS = ['id', 'name', 'amount', 'date', 'invoiceNo'];
const initialval = {
  bank: '',
};
const initValue = { id: null, amount: 0 };
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
  const [filter, setFilter] = useState(initialval);
  const { filterBranches } = useAppointments({
    action: ACTIONS.ViewBank_Accounting,
  });
  const { revenues, timeFrame, editBankTransition } = useBankAccounting({
    view,
    period,
    onEdit: () => {
      close();
    },
  });
  const updatedRevenues = useMemo(
    () =>
      revenues.filter(r =>
        r.bank.name.toLowerCase().includes(filter.bank.toLowerCase())
      ),
    [filter, revenues]
  );
  const handleClickEdit = useCallback(
    data => {
      const row = R.pick(['id', 'amount'])(data);
      setType('edit');
      setFormValue(row);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'edit') {
      editBankTransition({
        variables: {
          bankTransition: formValue,
        },
      });
    }
  }, [editBankTransition, formValue, type]);
  return (
    <>
      <MainContainer title="Banking" nobody></MainContainer>
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
                    <ListData
                      title="Banking Revenues"
                      data={revenues}
                      onEdit={handleClickEdit}
                    />
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
