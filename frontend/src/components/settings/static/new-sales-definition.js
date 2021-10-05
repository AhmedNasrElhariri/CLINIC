import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRNumberInput } from 'components';
import { useSalesDefinition } from 'hooks';
import {
  CRSelectInput,
  CRBrancheTree,
  CRDocSelectInput,
} from 'components/widgets';

function NewSalesDefinition({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
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
      onOk={() => {
        setShow(true);
        validate && onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        {type === 'addQuentity' ? (
          <>
            <CRDocSelectInput
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
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Type Item Name"
              block
            />
            <CRNumberInput
              label="Item Cost"
              name="cost"
              errorMessage={
                show && checkResult['cost'].hasError
                  ? checkResult['cost'].errorMessage
                  : ''
              }
              block
            />
            <CRNumberInput
              label="Item Price"
              name="price"
              errorMessage={
                show && checkResult['price'].hasError
                  ? checkResult['price'].errorMessage
                  : ''
              }
              block
            />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.Define_Sales}
            />
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
