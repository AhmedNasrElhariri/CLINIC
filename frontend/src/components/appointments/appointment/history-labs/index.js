import React, { useState, useMemo } from 'react';
import { Form } from 'rsuite';

import ListLabDocs from './list-lab-docs';
import { CRSelectInput } from 'components';
import { usePatientLabs } from 'hooks';

const HistoryLabs = ({ patient }) => {
  const [formValue, setFormValue] = useState({ labId: null });
  const { historyLabs } = usePatientLabs({ patientId: patient.id });

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
          block
        />
      </Form>
      <ListLabDocs labs={labs} />
    </>
  );
};

HistoryLabs.propTypes = {};

export default HistoryLabs;
