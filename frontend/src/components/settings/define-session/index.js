import React from 'react';
import { Form } from 'rsuite';

import { CRTextInput, CRModal } from 'components';
import { CRNumberInput } from 'components/widgets';

const DefineSession = ({
  show,
  onCancel,
  model,
  formValue,
  onChange,
  onCreate,
}) => {
  return (
    <CRModal
      show={show}
      header="Define Session"
      onHide={onCancel}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form fluid model={model} formValue={formValue} onChange={onChange}>
        <CRTextInput label="Name" name="name" />
        <CRNumberInput label="Price" name="price" />
      </Form>
    </CRModal>
  );
};

DefineSession.propTypes = {};

DefineSession.defaultProps = {};

export default DefineSession;
