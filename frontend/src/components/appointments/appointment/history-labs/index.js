import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'rsuite';

import ListLabDocs from './list-lab-docs';
import { CRSelectInput } from 'components';
import { usePatientDetails } from 'hooks';

const HistoryLabs = ({ patient }) => {
  const [formValue, setFormValue] = useState({ labId: null });
  const { historyLabs } = usePatientDetails({ patientId: patient.id });

  const labs = useMemo(() => {
    const lab = historyLabs.find(h => h.id === formValue.labId);
    return (lab?.documents || []).map(d => ({
      ...lab,
      ...d,
    }));
  }, [formValue.labId, historyLabs]);

  return (
    <>
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="labId"
          data={historyLabs}
          valueKey="id"
          labelKey="name"
          block
          // groupBy="category"
        />
      </Form>
      <ListLabDocs labs={labs} />
    </>
  );
};

HistoryLabs.propTypes = {};

export default HistoryLabs;
