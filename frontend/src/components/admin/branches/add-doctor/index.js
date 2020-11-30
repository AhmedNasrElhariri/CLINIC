import React, { useState } from 'react';
import { Form, Schema } from 'rsuite';
import { CRTextInput, CRModal, CRSelectInput } from 'components';
import { mapArrToChoices } from 'utils/misc';

const { StringType } = Schema.Types;

const model = Schema.Model({
  branchName: StringType().isRequired('Branch name is required'),
  specializations: StringType().isRequired('Specializations is required'),
  doctors: StringType().isRequired('Doctors is required'),
});

const initialValues = {
  branchName: '',
  specializations: '',
  doctors: '',
};

export default function AddDoctor({ show, onCancel, onCreate, branches }) {
  const [formValue, setFormValue] = useState(initialValues);

  const branchesName = mapArrToChoices(branches.map(branch => branch.name));

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
          name="branchName"
          label="Branch Name"
          block
          cleanable={true}
          searchable={true}
          data={branchesName}
        />
        <CRTextInput label="Specializations" name="specializations" />
        <CRTextInput label="Doctors" name="doctors" />
      </Form>
    </CRModal>
  );
}

AddDoctor.propTypes = {};

AddDoctor.defaultProps = {};
