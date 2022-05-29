import React, { useCallback, useState, useMemo } from 'react';
import * as R from 'ramda';
import { Form } from 'rsuite';
import Profit from './profit';
import Toolbar from '../accounting/toolbar';
import {
  Div,
  CRButton,
  CRCard,
  H6,
  MainContainer,
  BranchSpecialtyUserFilter,
} from 'components';
import NewSales from './new-sales';
import ListSaleses from './list-sales';
import Filter from '../filters';
import { Can } from 'components/user/can';
import PdfView from './sales-pdf';
import {
  useForm,
  useSales,
  useAccounting,
  useAppointments,
  useModal,
  useSalesDefinition,
  useConfigurations,
} from 'hooks';
import { formatDate } from 'utils/date';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { CRDocSelectInput, CRSelectInput } from 'components/widgets';
const initValue = { itemId: '', quantity: 0 };
const initFilter = {
  itemId: null,
  userId: null,
  specialtyId: null,
  branchId: null,
  userId: null,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const inialCurrentPage = {
  activePage: 1,
};
const Sales = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const [filter, setFilter] = useState(initFilter);
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { filterBranches } = useAppointments({ action: ACTIONS.View_Sales });
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [period, setPeriod] = useState([]);
  const { timeFrame } = useAccounting({ view, period });
  const [selectedItems, setSelectedItems] = useState([]);
  const { salesesDefinition } = useSalesDefinition({});
  const {
    saleses,
    totalSalesPrice,
    totalSalesCost,
    salesCounts,
    addSales,
    editSales,
    deleteSales,
    organizationusers,
    loading,
    editLoading,
    deleteLoading,
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
    page,
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    itemId: filter?.itemId,
    creatorId: filter?.userId,
  });
  const pages = Math.ceil(salesCounts / 20);
  const { pageSetupData } = useConfigurations();
  const pageSetupRow = pageSetupData.find(element => element.type === 'sales');
  const marginTop = pageSetupRow?.top * 37.7952755906 || 0;
  const marginRight = pageSetupRow?.right * 37.7952755906 || 0;
  const marginBottom = pageSetupRow?.bottom * 37.7952755906 || 0;
  const marginLeft = pageSetupRow?.left * 37.7952755906 || 0;
  // const updatedUsers = organizationusers.map(u => {
  //   return {
  //     id: u.id,
  //     name: u.name,
  //   };
  // });
  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
    },
    [selectedItems]
  );
  // const itemFilteredSales = useMemo(() => {
  //   if (filter.itemId == null) {
  //     return filteredSales;
  //   } else {
  //     const newSales = filteredSales.filter(
  //       s => s?.salesDefinition?.id == filter?.itemId?.id
  //     );
  //     return newSales;
  //   }
  // }, [filter, filteredSales]);
  // const itemFilteredSalesByUser = useMemo(() => {
  //   if (filter.userId == null) {
  //     return itemFilteredSales;
  //   } else {
  //     const newSales = itemFilteredSales.filter(
  //       s => s?.user?.id == filter.userId
  //     );
  //     return newSales;
  //   }
  // }, [filter, itemFilteredSales]);

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
  console.log(saleses, 'saleses');
  return (
    <>
      <MainContainer
        title="Sales"
        more={
          <Div display="flex">
            <Can I="Create" an="Sales">
              <CRButton variant="primary" onClick={handleClickCreate}>
                Add New Sales +
              </CRButton>
              <PdfView
                data={saleses}
                totalSalesPrice={totalSalesPrice}
                totalSalesCost={totalSalesCost}
                period={timeFrame}
                sales={true}
                marginTop={marginTop}
                marginRight={marginRight}
                marginBottom={marginBottom}
                marginLeft={marginLeft}
              />
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
        loading={loading || editLoading || deleteLoading}
        setSelectedItems={setSelectedItems}
        onClose={close}
        type={type}
      />
      <Div mb={50}>
        <Form formValue={filter} onChange={setFilter}>
          <Div display="flex" justifyContent="space-around">
            <CRSelectInput
              label="Item"
              data={salesesDefinition}
              name="itemId"
              placement="auto"
              style={{ width: '300px' }}
            />
            <CRSelectInput
              label="Creator"
              name="userId"
              placement="auto"
              data={organizationusers}
              style={{ width: '300px' }}
            />
          </Div>
        </Form>
      </Div>
      <BranchSpecialtyUserFilter
        formValue={branchSpecialtyUser}
        onChange={setBranchSpecialtyUser}
        branches={filterBranches}
      />
      <ListSaleses
        saleses={saleses}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      <Profit totalPrice={totalSalesPrice} totalCost={totalSalesCost} />
      {/* <Filter
        appointments={itemFilteredSalesByUser}
        branches={filterBranches}
        type="sales"
        render={(sales, totalSalesPrice, totalSalesCost) => (
          <>
            <ListSaleses
              saleses={sales}
              onEdit={handleClickEdit}
              onDelete={handleClickDelete}
            />
            <Profit totalPrice={totalSalesPrice} totalCost={totalSalesCost} />
            <Div
              mt={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <PdfView
                data={sales}
                period={timeFrame}
                sales={true}
                marginTop={marginTop}
                marginRight={marginRight}
                marginBottom={marginBottom}
                marginLeft={marginLeft}
              />
            </Div>
          </>
        )}
      /> */}
    </>
  );
};

export default Sales;
