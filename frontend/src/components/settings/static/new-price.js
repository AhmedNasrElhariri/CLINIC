import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRNumberInput ,CRSelectInput,CRBrancheTree} from 'components';
import { getCreatableApptTypes } from 'services/appointment';
const model = Schema.Model({});
const appointmentTypes = getCreatableApptTypes().map(type => ({
  id: type,
  name: type,
}));
function NewPrice({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Price' : 'Edit Price '),
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
        <CRSelectInput
          label="Examination/Followup"
          name="Apptype"
          block
          data={appointmentTypes}
        />
        <CRNumberInput
          label="Price"
          name="price"
          placeholder="Type Price"
          block
        />
        <CRBrancheTree formValue={formValue} onChange={onChange} action={ACTIONS.Create_Price}/>
      </Form>
    </CRModal>
  );
}

NewPrice.defaultProps = {
  type: 'create',
};

export default NewPrice;
