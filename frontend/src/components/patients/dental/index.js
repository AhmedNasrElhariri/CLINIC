import React, { useCallback } from 'react';
import Dental from './dental';
import ListToothTransaction from './list-tooth-transaction';
import { useModal, useForm, useDentalDiagnosis } from 'hooks';
import NewDiagnosis from './new-diagnosis';
import * as R from 'ramda';

const initValue = {
  toothNumber: 0,
  toothPartNumber: 0,
  diagnosisId: null,
  doctorId: null,
  depthType: '',
  depth: '',
  id: null,
};
const DentalChart = ({ patient }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addDentalDiagnosis,
    deleteDentalDiagnosis,
    allToothTransactions,
    tooths,
    doctors,
  } = useDentalDiagnosis({
    toothNumber: formValue.toothNumber,
    toothPartNumber: formValue.toothPartNumber,
    patientId: patient?.id,
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onDelete: () => {
      close();
      setFormValue(initValue);
    },
  });
  const handleAddDiagnosis = useCallback(
    data => {
      const toothNumber = R.propOr(1, 'toothNumber')(data);
      const toothPartNumber = R.propOr(1, 'toothPartNumber')(data);
      setType('create');
      setFormValue({
        ...formValue,
        toothNumber: toothNumber,
        toothPartNumber: toothPartNumber,
      });
      open();
    },
    [open, setFormValue, setType]
  );

  const handleDelete = useCallback(
    data => {
      const id = R.propOr(null, 'id')(data);
      setType('delete');
      setFormValue({
        ...formValue,
        id: id,
      });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      const updatedFormValue = {
        toothNumber: formValue.toothNumber,
        toothPartNumber: formValue.toothPartNumber,
        diagnosisId: formValue.diagnosisId,
        doctorId: formValue.doctorId,
        depth: formValue.depth,
        patientId: patient?.id,
      };
      addDentalDiagnosis({
        variables: {
          toothDiagnosis: updatedFormValue,
        },
      });
    }
    if (type === 'delete') {
      deleteDentalDiagnosis({
        variables: {
          id: formValue.id,
        },
      });
    }
  }, [type, formValue, addDentalDiagnosis, deleteDentalDiagnosis]);
  return (
    <>
      <Dental onAddDiagnosis={handleAddDiagnosis} tooths={tooths} />
      <NewDiagnosis
        visible={visible}
        formValue={formValue}
        type={type}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        doctors={doctors}
      />
      <ListToothTransaction
        toothTransactions={allToothTransactions}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DentalChart;
