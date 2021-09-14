import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import {
  CRModal,
  CRNumberInput,
  CRSelectInput,
  CRTextInput,
  Div,
} from 'components';
import { useMaterialDefinition } from 'hooks';

const model = Schema.Model({});


function NewFaceOperation({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
}) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Face Operation' : 'Delete Face Operation '),
    [type]
  );
  const { materialsDefinition } = useMaterialDefinition({});
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        {type === 'create' ? (
          <>
            {/* <CRNumberInput
              label="Face Partation Number"
              name="facePartationNumber"
              placeholder="Type Face Partation Number"
              disabled
              block
            /> */}
            <CRTextInput
              label="Partation Name"
              name="facePartationName"
              placeholder="Type Material"
              block
              disabled
            />
            <CRSelectInput
              label="Material"
              name="materialId"
              block
              data={materialsDefinition}
              placement="topStart"
            />
            <CRTextInput
              label="Units"
              name="units"
              placeholder="Type units"
              block
            />
          </>
        ) : (
          <Div>Are you sure that you want to delete this face Operation</Div>
        )}
      </Form>
    </CRModal>
  );
}

NewFaceOperation.defaultProps = {
  type: 'create',
};

export default NewFaceOperation;
