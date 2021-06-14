import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRTextInput, CRNumberInput } from 'components';
import { useSalesDefinition } from 'hooks';
import { CRSelectInput } from 'components/widgets';

const model = Schema.Model({});

function NewSalesDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New Item'
        : type === 'addQuentity'
        ? 'Add new Quantity '
        : 'Edit Sales Item ',
    [type]
  );
  const { salesesDefinition } = useSalesDefinition({});
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'addQuentity' ? (
          <>
            <CRSelectInput
              label="Sales Item"
              data={salesesDefinition}
              name="salesId"
              block
            />
            <CRNumberInput label="Add Quantity" name="quantity" block />
          </>
        ) : (
          <>
            <CRTextInput
              label="Item Name"
              name="name"
              placeholder="Type Item Name"
              block
            />
            <CRNumberInput label="Item Cost" name="cost" block />
            <CRNumberInput label="Item Price" name="price" block />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewSalesDefinition.defaultProps = {
  type: 'create',
};

export default NewSalesDefinition;
