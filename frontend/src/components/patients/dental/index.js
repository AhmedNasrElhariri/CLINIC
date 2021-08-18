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
};
const DentalChart = ({ patient }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  console.log(formValue,'dldldldl');
  const { addDentalDiagnosis, toothTransactions, tooths, doctors } =
    useDentalDiagnosis({
      toothNumber: formValue.toothNumber,
      toothPartNumber: formValue.toothPartNumber,
      patientId: patient?.id,
      onCreate: () => {
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
  }, [type, formValue, addDentalDiagnosis]);
  return (
    <>
      <Dental onAddDiagnosis={handleAddDiagnosis} tooths={tooths} />
      <NewDiagnosis
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        doctors={doctors}
      />
      <ListToothTransaction toothTransactions={toothTransactions} />
    </>
  );
};

export default DentalChart;
