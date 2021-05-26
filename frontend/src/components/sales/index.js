import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import Profit from './profit';
import Toolbar from '../accounting/toolbar';
import { Div, CRButton, CRCard, H6,MainContainer } from 'components';
import NewSales from './new-sales';
import ListSaleses from './list-sales';
import PdfView from '../accounting/toolbar/salesPdf';
import { useForm, useSales, useAccounting, useModal } from 'hooks';
import { formatDate } from 'utils/date';
import { ACCOUNTING_VIEWS } from 'utils/constants';
const initValue = { salesDefinitionId: '', quantity: '' };

const Sales = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const [view, setView] = useState(ACCOUNTING_VIEWS.WEEK);
  const [period, setPeriod] = useState([]);
  const { timeFrame } = useAccounting({ view, period });
  const {
    addSales,
    saleses,
    editSales,
    deleteSales,
    filteredSales,
    totalSalesCost,
    totalSalesPrice,
  } = useSales({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
    },
    view,
    period,
  });
  console.log(totalSalesCost);
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  const handleClickEdit = useCallback(
    data => {
      const sales = R.pick(['id', 'quantity', 'salesDefinitionId'])(data);
      setType('edit');
      setFormValue(sales);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const sales = R.pick(['id'])(data);
      setType('delete');
      setFormValue(sales);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addSales({
        variables: {
          sales: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteSales({
        variables: {
          id: formValue.id,
        },
      });
    } else {
      editSales({
        variables: {
          sales: formValue,
        },
      });
    }
  }, [addSales, editSales, formValue, type]);
  return (
    <>
      <MainContainer
        title="Sales"
        more={
          <Div display="flex">
            <Div mr={10}>
              <PdfView data={filteredSales} period={timeFrame} sales={true} />
            </Div>
            <CRButton variant="primary" onClick={handleClickCreate}>
              Add New Sales +
            </CRButton>
          </Div>
        }
        nobody
      ></MainContainer>
      <CRCard borderless>
        <Toolbar
          activeKey={view}
          onSelect={setView}
          onChangePeriod={setPeriod}
        />

        <Div display="flex" my={4}>
          <H6>Showing for :</H6>
          <H6 variant="primary" ml={2} fontWeight="bold">
            {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
          </H6>
        </Div>
      </CRCard>
      <NewSales
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListSaleses
        saleses={filteredSales}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
      <Profit totalPrice={totalSalesPrice} totalCost={totalSalesCost} />
    </>
  );
};

export default Sales;
