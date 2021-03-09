import React, { useCallback, useMemo } from 'react';
import ListLabDocs from './list-labs';
import UpdateLab from './edit-lab';
import { formatDate } from 'utils/date';
import * as R from 'ramda';
import useFrom from 'hooks/form';
import { GET_PATIENT_LADDOC } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import useModal from 'hooks/use-model';
const initValue = { labId: '', labDefinition: {}, value: '', files: [] };
const PendingLabs = ({ patient }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const status = 'pending';
  const patientId = patient.id;
  const { data } = useQuery(GET_PATIENT_LADDOC, {
    variables: { status: status, patientId: patientId },
  });
  const patientLabDocs = useMemo(() => R.propOr([], 'patientLabDocs')(data), [
    data,
  ]);
  const labs = useMemo(
    () =>
      patientLabDocs.map(element => {
        return {
          name: element.labDefinition.name,
          date: formatDate(element.requiredDate),
          id: element.id,
        };
      }),
    [patientLabDocs]
  );
  const handleClickEdit = useCallback(
    data => {
      const id = data.id;
      const name = data.name;
      const lab = { labId: id, name: name, value: '', files: [] };
      setType('edit');
      setFormValue(lab);
      open();
    },
    [open, setFormValue, setType]
  );
  return (
    <>
      <ListLabDocs labs={labs} onEdit={handleClickEdit} />
      <UpdateLab
        visible={visible}
        onClose={close}
        formValue={formValue}
        setFormValue={setFormValue}
        type={type}
      />
    </>
  );
};

PendingLabs.propTypes = {};

export default PendingLabs;
