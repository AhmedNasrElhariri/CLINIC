import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';
import { CRModal, CRSelectInput } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  branch: StringType().isRequired('Branch is required'),
});

const initialValues = {
  branchId: null,
  specialtyId: null,
};

export default function AddSpecialty({
  show,
  onAdd,
  onCancel,
  branches,
  specialties,
}) {
  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

  return (
    <CRModal
      show={show}
      header="Add Specialty"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onAdd(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="branchId"
          label="Branch"
          data={branches}
          block
        />
        <CRSelectInput
          name="specialtyId"
          label="Specialty"
          data={specialties}
          block
        />
      </Form>
    </CRModal>
  );
}

AddSpecialty.propTypes = {};

AddSpecialty.defaultProps = {
  branches: [],
  specialties: [],
};
