import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import NewDentalDiagnosisDefinition from './new-dentalDiagnosis-definition';
import ListDentalDiagnosissDefinition from './list-dentalDiagnosiss-definition';
import { useForm, useDentalDiagnosisDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { Validate } from 'services/form';
import { useModal } from 'hooks';

const initValue = { name: '' };
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('dental name is required'),
});

const DentalDiagnosisDefinition = () => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const {
    addDentalDiagnosisDefinition,
    dentalDiagnosissDefinition,
    editDentalDiagnosisDefinition,
  } = useDentalDiagnosisDefinition({
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
      const dentalDiagnosis = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(dentalDiagnosis);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create' && Validate(model, formValue)) {
      addDentalDiagnosisDefinition({
        variables: {
          dentalDiagnosisDefinition: formValue,
        },
      });
    } else if (type === 'edit' && Validate(model, formValue)) {
      editDentalDiagnosisDefinition({
        variables: {
          dentalDiagnosisDefinition: formValue,
        },
      });
    }
  }, [
    addDentalDiagnosisDefinition,
    editDentalDiagnosisDefinition,
    formValue,
    type,
  ]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Dental Diagnosis+
        </CRButton>
      </Div>
      <NewDentalDiagnosisDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListDentalDiagnosissDefinition
        dentalDiagnosiss={dentalDiagnosissDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default DentalDiagnosisDefinition;
