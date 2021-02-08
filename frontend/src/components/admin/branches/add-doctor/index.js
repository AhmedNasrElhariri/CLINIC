import React, { useState, useEffect, useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { CRModal, CRSelectInput } from 'components';

const { StringType } = Schema.Types;

const model = Schema.Model({
  branchId: StringType().isRequired('Branch is required'),
  specialtyId: StringType().isRequired('Specialty is required'),
  userId: StringType().isRequired('Specialties is required'),
});

const initialValues = {
  branchId: null,
  specialtyId: null,
  userId: null,
};

export default function AddDoctor({
  show,
  onCancel,
  onCreate,
  specialties,
  doctors,
}) {
  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

  const branches = useMemo(() => {
    const specialty = specialties.find(sp => sp.id === formValue.specialtyId);
    return !!specialty ? specialty.branches : [];
  }, [formValue.specialtyId, specialties]);

  return (
    <CRModal
      show={show}
      header="Add Doctor"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="specialtyId"
          label="Specialty"
          valueKey="id"
          labelKey="name"
          data={specialties}
          block
          cleanable
          searchable
        />
        <CRSelectInput
          name="branchId"
          label="Branch"
          valueKey="id"
          labelKey="name"
          data={branches}
          disabled={!formValue.specialtyId}
          block
          cleanable
          searchable
        />
        <CRSelectInput
          name="userId"
          label="Doctor"
          valueKey="id"
          labelKey="name"
          data={doctors}
          block
          cleanable
          searchable
        />
      </Form>
    </CRModal>
  );
}

AddDoctor.propTypes = {};

AddDoctor.defaultProps = {
  specialties: [],
  doctors: [],
};
