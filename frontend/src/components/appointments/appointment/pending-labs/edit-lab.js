import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import AddLabImages from '../add-lab-images';
import { CRModal, CRTextInput,CRSelectInput } from 'components';
import useLabsCategory from 'hooks/fetch-labs-category';

const model = Schema.Model({});

function UpdateLab({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Lab' : 'Insert Lab Values '),
    [type]
  );
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput
          label="value"
          name="value"
          placeholder="Type value"
          block
        />
        <AddLabImages name="images" />
      </Form>
    </CRModal>
  );
}

UpdateLab.defaultProps = {
  type: 'create',
};

export default UpdateLab;
