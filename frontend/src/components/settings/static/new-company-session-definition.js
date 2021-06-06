import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRModal, CRSelectInput ,CRNumberInput } from 'components';
import { useCompanyDefinition, useConfigurations } from 'hooks';
const model = Schema.Model({});

function NewCompanySessionDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () =>
      type === 'create' ? 'Add New Company Session' : 'Edit Company Session',
    [type]
  );
  const { companysDefinition } = useCompanyDefinition({});
  const { sessions } = useConfigurations();
  const choices = useMemo(() => {
    const allChoices = [...sessions];
    return allChoices.map(s => ({ name: s.name, id: s.name }));
  }, [sessions]);
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
          label="Company Name"
          name="companyId"
          placeholder="Type Company"
          data={companysDefinition}
          block
        />
        <CRSelectInput
          label="Session Name"
          name="name"
          placeholder="Select Type"
          data={choices}
          block
        />
        <CRNumberInput
          label="price"
          name="price"
          
        />
      </Form>
    </CRModal>
  );
}

NewCompanySessionDefinition.defaultProps = {
  type: 'create',
};

export default NewCompanySessionDefinition;
