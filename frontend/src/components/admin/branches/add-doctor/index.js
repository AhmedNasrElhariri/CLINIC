import React, { useState, useEffect, useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { CRModal, CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
      header={t('addDoctor')}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
      okTitle={t('ok')}
      cancelTitle={t('cancel')}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="specialtyId"
          label={t('specialty')}
          data={specialties}
          block
        />
        <CRSelectInput
          name="branchId"
          label={t('branch')}
          data={branches}
          disabled={!formValue.specialtyId}
          block
        />
        <CRSelectInput name="userId" label={t('doctor')} data={doctors} block />
      </Form>
    </CRModal>
  );
}

AddDoctor.propTypes = {};

AddDoctor.defaultProps = {
  specialties: [],
  doctors: [],
};
