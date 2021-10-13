import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewPatientReport from './new-patient-report';
import ListPatientReports from './list-patient-report';
import { useForm, useModal, usePatientReports } from 'hooks';

const initValue = { name: '', body: '', context: '' };

const PatientReport = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });

  const { addPatientReport, patientReports, editPatientReport } =
    usePatientReports({
      onCreate: () => {
        close();
        setFormValue(initValue);
      },
      onEdit: () => {
        close();
        setFormValue(initValue);
      },
    });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const report = R.pick(['id', 'name', 'body'])(data);
      setType('edit');
      setFormValue(report);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    const bodyFinal = '<pre>' + formValue.body + '</pre>';
    const updatedFormValue = {
      name: formValue.name,
      body: bodyFinal,
      context: formValue.context,
    };
    if (type === 'create') {
      addPatientReport({
        variables: {
          patientReport: updatedFormValue,
        },
      });
    } else {
      const updatedFormValueTwo = { ...updatedFormValue, id: formValue.id };
      editPatientReport({
        variables: {
          patientReport: updatedFormValueTwo,
        },
      });
    }
  }, [addPatientReport, editPatientReport, formValue, type]);
  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate}>
          New Patient Report +
        </CRButton>
      </Div>
      <NewPatientReport
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListPatientReports reports={patientReports} onEdit={handleClickEdit} />
    </>
  );
};

export default PatientReport;
