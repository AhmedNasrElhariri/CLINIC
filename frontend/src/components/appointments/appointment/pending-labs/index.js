import React, { useCallback, useState } from 'react';

import ListLabDocs from './list-labs';
import InsertLabResult from './insert-lab';

import { useModal, usePatientDetails } from 'hooks';

const PendingLabs = ({ patient }) => {
  const { visible, open, close } = useModal();
  const [selectedLab, setSelectedLab] = useState({});

  const { pendingLabs, insertLabResult } = usePatientDetails({
    patientId: patient.id,
  });

  const handleClickEdit = useCallback(
    data => {
      setSelectedLab(data);
      open();
    },
    [open, setSelectedLab]
  );
  return (
    <>
      <ListLabDocs labs={pendingLabs} onEdit={handleClickEdit} />
      <InsertLabResult
        visible={visible}
        onClose={close}
        labs={pendingLabs}
        onCreate={insertLabResult}
        id={selectedLab.id}
      />
    </>
  );
};

PendingLabs.propTypes = {};

export default PendingLabs;
