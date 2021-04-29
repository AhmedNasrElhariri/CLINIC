import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRSelectInput, CRNumberInput } from 'components';
import { useSalesDefinition } from 'hooks';

const model = Schema.Model({});

function NewSales({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Sales' : 'Edit Sales '),
    [type]
  );
  const { salesesDefinition } = useSalesDefinition({});
  const salesItems = salesesDefinition.map(s => {
    return {
      id: s.id,
      name: s.name,
    };
  });
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRSelectInput
          label="Item"
          name="salesDefinitionId"
          placeholder="Select Item"
          data={salesItems}
          block
        />
        <CRNumberInput label="Quantity" name="quantity" block />
      </Form>
    </CRModal>
  );
}

NewSales.defaultProps = {
  type: 'create',
};

export default NewSales;
