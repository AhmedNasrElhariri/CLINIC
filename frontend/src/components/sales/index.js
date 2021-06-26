import React, { useCallback, useState, useMemo } from 'react';
import * as R from 'ramda';
import { Form } from 'rsuite';
import Profit from './profit';
import Toolbar from '../accounting/toolbar';
import { Div, CRButton, CRCard, H6, MainContainer } from 'components';
import NewSales from './new-sales';
import ListSaleses from './list-sales';
import { Can } from 'components/user/can';
import PdfView from './sales-pdf';
import {
  useForm,
  useSales,
  useAccounting,
  useModal,
  useSalesDefinition,
} from 'hooks';
import { formatDate } from 'utils/date';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import { CRSelectInput } from 'components/widgets';
const initValue = { itemId: '', quantity: 0 };
const initFilter = {
  item: '',
  user: '',
};
const Sales = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const [filter, setFilter] = useState(initFilter);
  const [view, setView] = useState(ACCOUNTING_VIEWS.WEEK);
  const [period, setPeriod] = useState([]);
  const { timeFrame } = useAccounting({ view, period });
  const [selectedItems, setSelectedItems] = useState([]);
  const { salesesDefinition } = useSalesDefinition({});
  const updatedSalesItems = salesesDefinition.map(s => {
    return {
      id: s.name,
      name: s.name,
    };
  });
  const {
    addSales,
    saleses,
    editSales,
    deleteSales,
    filteredSales,
    totalSalesCost,
    organizationusers,
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
  const updatedUsers = organizationusers.map(u => {
    return {
      id: u.name,
      name: u.name,
    };
  });
  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
    },
    [selectedItems]
  );
  const itemFilteredSales = useMemo(
    () =>
      filteredSales.filter(s =>
        s.salesDefinition.name.toLowerCase().includes(filter.item.toLowerCase())
      ),
    [filter, filteredSales]
  );
  const itemFilteredSalesByUser = useMemo(
    () =>
      itemFilteredSales.filter(s =>
        s.user.name.toLowerCase().includes(filter.user.toLowerCase())
      ),
    [filter, itemFilteredSales]
  );
  const handleAddItems = useCallback(() => {
    const newItems = [...selectedItems, formValue];
    setSelectedItems(newItems);
    setFormValue(initValue);
  }, [formValue, selectedItems]);
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
          sales: selectedItems,
        },
      });
      setSelectedItems([]);
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
              <PdfView
                data={itemFilteredSalesByUser}
                period={timeFrame}
                sales={true}
              />
            </Div>
            <Can I="Create" an="Sales">
              <CRButton variant="primary" onClick={handleClickCreate}>
                Add New Sales +
              </CRButton>
            </Can>
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
        handleDelete={handleDelete}
        handleAdd={handleAddItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onClose={close}
        type={type}
      />
      <Div mb={50}>
        <Form formValue={filter} onChange={setFilter}>
          <Div display="flex" justifyContent="space-around">
            <CRSelectInput
              label="Item"
              name="item"
              data={updatedSalesItems}
              style={{ width: '300px' }}
            />
            <CRSelectInput
              label="Creator"
              name="user"
              data={updatedUsers}
              style={{ width: '300px' }}
            />
          </Div>
        </Form>
      </Div>
      <ListSaleses
        saleses={itemFilteredSalesByUser}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
      <Profit totalPrice={totalSalesPrice} totalCost={totalSalesCost} />
    </>
  );
};

export default Sales;
