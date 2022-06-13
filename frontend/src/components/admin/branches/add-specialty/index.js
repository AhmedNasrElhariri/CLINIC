import React, { useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';
import { CRModal, CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  useEffect(() => {
    if (!show) {
      setFormValue(initialValues);
    }
  }, [show]);

  return (
    <CRModal
      show={show}
      header={t('addSpecialty')}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onAdd(formValue)}
      okTitle={t('ok')}
      cancelTitle={t('cancel')}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="branchId"
          label={t('branch')}
          data={branches}
          block
        />
        <CRSelectInput
          name="specialtyId"
          label={t('specialty')}
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
