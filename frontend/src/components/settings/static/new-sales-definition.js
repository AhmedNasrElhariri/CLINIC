import React, { useMemo } from 'react';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { CRModal, CRTextInput, CRNumberInput, Div, H3 } from 'components';
import { useSalesDefinition } from 'hooks';
import { CRBrancheTree, CRDocSelectInput } from 'components/widgets';

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
  loading,
}) {
  const header = useMemo(
    () =>
      type === 'create'
        ? 'Add New Item'
        : type === 'addQuentity'
        ? 'Add new Quantity '
        : type === 'delete'
        ? 'Delete Sales Item'
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
        type !== 'addQuentity' ? validate && onOk() : onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
      loading={loading}
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
        ) : type === 'delete' ? (
          <Div>
            <H3>
              Are you sure that you want to delete the Sales Item and all
              related items?{' '}
            </H3>
          </Div>
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
