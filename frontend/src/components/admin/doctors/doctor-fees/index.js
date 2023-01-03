import { useCallback } from 'react';
import Filter from './fees-filter';
import ListDoctorFees from './list-doctor-fees';
import { useModal } from 'hooks';
import { useState } from 'react';
import * as R from 'ramda';
import EditableDoctorFees from './editable-doctor-fees';
import { useDoctor } from 'hooks';
import { useTranslation } from 'react-i18next';

const DoctorFees = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState({});
  const [type, setType] = useState('');
  const [filter, setFilter] = useState({ doctorId: null, status: 'Draft' });
  const [period, setPeriod] = useState([]);
  const {
    doctors,
    doctorFeesTransactions,
    totalDoctorFees,
    doctorFeesCount,
    editDoctorFees,
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
  });
  const pages = Math.ceil(doctorFeesCount / 20);
  const handleClickEditDoctorFees = useCallback(
    data => {
      const fees = R.pick(['id', 'name', 'amount'])(data);
      setType('editFees');
      setFormValue(fees);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'editFees') {
      editDoctorFees({
        variables: {
          doctorFees: formValue,
        },
      });
    }
  }, [editDoctorFees, formValue, type]);
  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        doctors={doctors}
        setPeriod={setPeriod}
        t={t}
      />
      <ListDoctorFees
        fees={doctorFeesTransactions}
        t={t}
        total={totalDoctorFees}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
        onEdit={handleClickEditDoctorFees}
      />
      <EditableDoctorFees
        show={visible}
        onHide={close}
        onCancel={close}
        onOk={handleAdd}
        formValue={formValue}
        onChange={setFormValue}
        type={type}
      />
    </>
  );
};
export default DoctorFees;
