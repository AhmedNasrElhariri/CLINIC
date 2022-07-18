import React, { useState, useMemo, useCallback } from 'react';
import { Form } from 'rsuite';
import * as R from 'ramda';
import ListLabDocs from './list-lab-docs';
import { CRSelectInput } from 'components';
import { usePatientLabs, useModal } from 'hooks';
import DeleteImage from './delete-image';
const initalVal = { labId: null, imageId: null };

const HistoryLabs = ({ patient }) => {
  const { visible, open, close } = useModal();
  const [header, setHeader] = useState('');
  const [formValue, setFormValue] = useState(initalVal);
  const { historyLabs, deleteLabPhoto } = usePatientLabs({
    patientId: patient.id,
    onDelete: close,
  });
  const labs = useMemo(() => {
    const lab = historyLabs.find(h => h.id === formValue.labId);
    return (lab?.documents || []).map(d => ({
      ...lab,
      ...d,
    }));
  }, [formValue.labId, historyLabs]);
  const handleDeleteImage = useCallback(
    data => {
      const image = R.pick(['id'])(data);
      setHeader('Delete Image');
      setFormValue({ ...formValue, imageId: image.id });
      open();
    },
    [open, setFormValue, setHeader, formValue]
  );
  const handleAdd = useCallback(() => {
    deleteLabPhoto({
      variables: {
        id: formValue.imageId,
      },
    });
  }, [deleteLabPhoto, formValue]);
  return (
    <>
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="labId"
          data={historyLabs}
          block
          style={{ marginTop: '10px', width: '310px', marginLeft: '0px' }}
        />
      </Form>
      <ListLabDocs
        labs={historyLabs}
        labId={formValue.labId}
        onDelete={handleDeleteImage}
      />
      <DeleteImage
        visible={visible}
        formValue={formValue}
        onOk={handleAdd}
        onClose={close}
        header={header}
      />
    </>
  );
};

HistoryLabs.propTypes = {};

export default HistoryLabs;
