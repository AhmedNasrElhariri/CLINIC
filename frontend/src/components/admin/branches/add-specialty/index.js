import React, { useState } from 'react';
import { Form, Schema } from 'rsuite';
import { CRTextInput, CRModal, CRSelectInput } from 'components';
import { mapArrToChoices } from 'utils/misc';

const { StringType } = Schema.Types;

const model = Schema.Model({
  branch: StringType().isRequired('Branch is required'),
});

const initialValues = {
  branch: '',
  specialty: '',
};

export default function AddSpecialty({
  show,
  onCancel,
  onCreate,
  branches,
}) {
  const [formValue, setFormValue] = useState(initialValues);

  const branchesName = mapArrToChoices(branches.map(branch => branch.name));

  return (
    <CRModal
      show={show}
      header="Add Specialty"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onCreate(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="branch"
          label="Branch"
          block
          cleanable={true}
          searchable={true}
          data={branchesName}
        />
        <CRTextInput name="specialty" label="Specialty" block />
      </Form>
    </CRModal>
  );
}

AddSpecialty.propTypes = {};

AddSpecialty.defaultProps = {};
