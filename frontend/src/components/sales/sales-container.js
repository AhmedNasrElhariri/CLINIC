import { useCallback, useState } from 'react';
import * as R from 'ramda';
import { Form, Whisper, Nav } from 'rsuite';
import Toolbar from '../accounting/toolbar';
import {
  CRButton,
  H6,
  BranchSpecialtyUserFilter,
  Total,
  MenuPopover,
} from 'components';
import NewSale from '../sales-from-inventory/sale-item';
import ListSaleses from './list-sales';
import { Can } from 'components/user/can';
import {
  useForm,
  useSales,
  useBranchTree,
  useModal,
  useGeneralHook,
  useUsers,
  useInventory,
} from 'hooks';
import { formatDate } from 'utils/date';
import { ACCOUNTING_VIEWS, ACTIONS } from 'utils/constants';
import { CRSelectInput } from 'components/widgets';
import useGlobalState from 'state';
import axios from 'axios';

const initValue = { itemId: '', quantity: 0 };
const initFilter = {
  item: null,
  userId: null,
  specialtyId: null,
  branchId: null,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const inialCurrentPage = {
  activePage: 1,
};
const SalesContainer = ({ t }) => {
  const { visible, open, close } = useModal();
  const [user] = useGlobalState('user');

  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { filterBranches } = useBranchTree({ action: ACTIONS.View_Sales });
  const [view, setView] = useState(ACCOUNTING_VIEWS.DAY);
  const [period, setPeriod] = useState([]);
  const { timeFrame } = useGeneralHook({ view, period });
  const { items } = useInventory({});
  const { users: organizationusers } = useUsers({});
  const {
    saleses,
    totalSalesPrice,
    totalSalesCost,
    salesCounts,
    addSales,
    editSales,
    deleteSales,
    loading,
    editLoading,
    deleteLoading,
    consumeInventoryManual,
    reconstructSales,
  } = useSales({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
    },
    onConsumeInventory: () => {
      close();
      setSelectedItems([]);
    },
    isSelling: true,
    view,
    period,
    page,
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    itemId: R.propOr(null, 'item')(filter),
    creatorId: filter?.userId,
  });
  const totals = {
    totalSales: totalSalesPrice,
    totalCost: totalSalesCost,
    profit: totalSalesPrice - totalSalesCost,
  };
  const pages = Math.ceil(salesCounts / 20);
  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
    },
    [selectedItems]
  );

  const handleAddItems = useCallback(() => {
    const newItems = [...selectedItems, formValue];
    setSelectedItems(newItems);
    setFormValue(initValue);
  }, [formValue, selectedItems, setFormValue]);

  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const sales = R.pick(['id', 'quantity', 'totalPrice'])(data);
      setType('edit');
      setFormValue({ ...sales, saleOption: 'saleByUnit' });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickReconstruct = useCallback(() => {
    setType('reconstruct');
    open();
  }, [setType, open]);
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
  }, [addSales, editSales, formValue, type, deleteSales, selectedItems]);

  const handleSalesExcelReport = async day => {
    axios({
      url: '/salesExcel',
      responseType: 'blob', // important
      params: {
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        itemId: R.propOr(null, 'id')(filter?.item),
        creatorId: filter?.userId,
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
        link.setAttribute('download', `sales-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  const handleSalesPrintReport = async day => {
    axios({
      url: '/salesPrintReport',
      responseType: 'blob', // important
      method: 'GET',
      params: {
        view,
        branchId: branchSpecialtyUser?.branch,
        specialtyId: branchSpecialtyUser?.specialty,
        doctorId: branchSpecialtyUser?.doctor,
        itemId: R.propOr(null, 'id')(filter?.item),
        creatorId: filter?.userId,
        dateFrom: period[0],
        dateTo: period[1],
        organizationId: user.organizationId,
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sales.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? handleSalesPrintReport() : handleSalesExcelReport();
  }
  return (
    <>
      <div className="flex flex-wrap justify-between gap-5 items-center">
        <h1 className="text-2xl mb-4">{t('sales')}</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <Can I="Create" an="Sales">
            <CRButton variant="primary" onClick={handleClickCreate}>
              {t('addNewSales')} +
            </CRButton>
            <CRButton variant="primary" onClick={handleClickReconstruct}>
              {t('reconstruct')}
            </CRButton>
            <Whisper
              placement="bottomStart"
              trigger="click"
              speaker={<MenuPopover onSelect={handleSelectMenu} />}
            >
              <CRButton>Print</CRButton>
            </Whisper>
          </Can>
        </div>
      </div>

      <div className="my-3">
        <Toolbar
          activeKey={view}
          onSelect={setView}
          onChangePeriod={setPeriod}
        />
      </div>
      <div className="flex my-3">
        <H6>{t('showingFor')} :</H6>
        <H6 variant="primary" ml={2} fontWeight="bold">
          {formatDate(R.head(timeFrame))} - {formatDate(R.last(timeFrame))}
        </H6>
      </div>

      <NewSale
        setSelectedItems={setSelectedItems}
        close={close}
        selectedItems={selectedItems}
        formValue={formValue}
        visible={visible}
        consumeInventoryManual={consumeInventoryManual}
        t={t}
        setFormValue={setFormValue}
        isSelling
        type={type}
        reconstructSales={reconstructSales}
      />

      <Form
        formValue={filter}
        onChange={setFilter}
        className="flex flex-wrap items-center gap-5 mb-5"
      >
        <CRSelectInput
          label={t('item')}
          data={items}
          name="item"
          keyValue="id"
          placement="auto"
          style={{ width: 256 }}
        />
        <CRSelectInput
          label={t('creator')}
          name="userId"
          placement="auto"
          data={organizationusers}
          style={{ width: 256 }}
        />
      </Form>

      <BranchSpecialtyUserFilter
        formValue={branchSpecialtyUser}
        onChange={setBranchSpecialtyUser}
        branches={filterBranches}
      />

      <ListSaleses
        saleses={saleses}
        // onEdit={handleClickEdit}
        onDelete={handleClickDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      <Total totals={totals} />
    </>
  );
};
export default SalesContainer;
