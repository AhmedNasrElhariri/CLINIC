import { useCallback } from 'react';
import Filter from './fees-filter';
import ListDoctorFees from './list-doctor-fees';
import { useModal } from 'hooks';
import { useState } from 'react';
import * as R from 'ramda';
import EditableDoctorFees from './editable-doctor-fees';
import { useDoctor, useSessionDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';
import Actions from './actions';
import axios from 'axios';
import useGlobalState from 'state';

const initialFormValue = {
  name: '',
  amount: 0,
  doctorId: null,
  session: {},
};
const DoctorFees = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [type, setType] = useState('');
  const [filter, setFilter] = useState({
    doctorId: null,
    status: 'Draft',
    type: 'Debit',
  });
  const [period, setPeriod] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { sessionsDefinition } = useSessionDefinition({});
  const [user] = useGlobalState('user');
  const {
    doctors,
    doctorFeesTransactions,
    totalDoctorFees,
    doctorFeesCount,
    editDoctorFees,
    gatherDoctorFees,
    addNewDoctorFees,
    totalPrice,
    totalCost,
  } = useDoctor({
    onCreateUser: close,
    onEditUser: close,
    onEditDoctorFees: () => {
      setFormValue({});
      close();
    },
    doctorId: filter?.doctorId,
    dateFrom: period && period[0],
    dateTo: period && period[1],
    status: filter?.status,
    type: filter?.type,
    page: currentPage,
  });
  const pages = Math.ceil(doctorFeesCount / 20);
  const handleClickEditDoctorFees = useCallback(
    data => {
      const fees = R.pick([
        'id',
        'name',
        'amount',
        'totalPrice',
        'date',
        'cost',
      ])(data);
      setType('editFees');
      setFormValue(fees);
      open();
    },
    [open, setFormValue, setType]
  );
  const handlePayDoctorFees = useCallback(() => {
    gatherDoctorFees({
      variables: {
        gatherDoctorFeesData: {
          ids: checkedKeys,
        },
      },
    });
    setCheckedKeys([]);
  }, [checkedKeys, gatherDoctorFees, setCheckedKeys]);
  const handleAddNewFees = useCallback(() => {
    setType('addNewFees');
    open();
  }, [open, setType]);
  const handleAdd = useCallback(() => {
    if (type === 'editFees') {
      editDoctorFees({
        variables: {
          doctorFees: formValue,
        },
      });
    } else if (type === 'addNewFees') {
      const { session, ...rest } = formValue;
      addNewDoctorFees({
        variables: {
          doctorFees: {
            ...rest,
            sessionId: session.id,
            sessionName: session.name,
          },
        },
      });
    }
  }, [addNewDoctorFees, editDoctorFees, formValue, type]);
  const printDoctorFees = () => {
    axios({
      url: '/doctorFees',
      method: 'POST',
      responseType: 'blob', // important
      params: {
        organizationId: user.organizationId,
        status: filter?.status,
        doctorId: filter?.doctorId,
        dateFrom: period && period[0],
        dateTo: period && period[1],
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'doctor.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };

  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        doctors={doctors}
        setPeriod={setPeriod}
        t={t}
      >
        <Actions
          filter={filter}
          handlePayDoctorFees={handlePayDoctorFees}
          addNewFees={handleAddNewFees}
          print={printDoctorFees}
          checkedKeys={checkedKeys}
        />
      </Filter>
      <ListDoctorFees
        fees={doctorFeesTransactions}
        t={t}
        total={totalDoctorFees}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
        onEdit={handleClickEditDoctorFees}
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        filter={filter}
        totalPrice={totalPrice}
        totalCost={totalCost}
      />
      <EditableDoctorFees
        show={visible}
        onHide={close}
        onCancel={close}
        onOk={handleAdd}
        formValue={formValue}
        onChange={setFormValue}
        type={type}
        users={doctors}
        sessionsDefinition={sessionsDefinition}
      />
    </>
  );
};
export default DoctorFees;
