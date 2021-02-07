import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewPatientReport from './new-patient-report';
import ListPatientReports from './list-patient-report';
import usePatientReports from 'hooks/fetch-patient-reports';

const initValue = { name: '', body: '' };

const PatientReport = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });

  const {
    addPatientReport,
    patientReports,
    editPatientReport,
  } = usePatientReports({
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
    if (type === 'create') {
      addPatientReport({
        variables: {
          patientReport: formValue,
        },
      });
    } else {
      editPatientReport({
        variables: {
          patientReport: formValue,
        },
      });
    }
  }, [addPatientReport, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
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
