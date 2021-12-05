import React, { useMemo } from 'react';
import { ACTIONS } from 'utils/constants';
import {
  CRModal,
  CRTextInput,
  CRRadio,
  CRBrancheTree,
  Div,
  H3,
} from 'components';
import { Form } from 'rsuite';

const options = [
  {
    value: 'tablets',
    name: 'Tablets',
  },
  {
    value: 'capsules',
    name: 'Capsules',
  },
  {
    value: 'syrup',
    name: 'Syrup',
  },
  {
    value: 'drops',
    name: 'Drops',
  },
  {
    value: 'cream/ointment',
    name: 'Cream/ointment',
  },
  {
    value: 'power',
    name: 'Power',
  },
  {
    value: 'amp',
    name: 'AMP',
  },
  {
    value: 'sachets',
    name: 'Sachets',
  },
  {
    value: 'vial',
    name: 'Vial',
  },
  {
    value: 'Suppository',
    name: 'Suppository',
  },
  {
    value: 'Gil',
    name: 'Gil',
  },
];

function NewMedicine({
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
        ? 'Add New Medicine'
        : type === 'edit'
        ? 'Edit Medicine'
        : 'Delete Medicine',
    [type]
  );
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
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the Medicine ? </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label="Medicine Name"
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Type Name"
              block
            />
            <CRTextInput
              label="Concentration"
              name="concentration"
              errorMessage={
                show && checkResult['concentration'].hasError
                  ? checkResult['concentration'].errorMessage
                  : ''
              }
              placeholder="Type Concentration"
              block
            />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.View_Medicine}
            />
            <CRRadio
              label="Medicine Form"
              name="form"
              errorMessage={
                show && checkResult['form'].hasError
                  ? checkResult['form'].errorMessage
                  : ''
              }
              options={options}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewMedicine.defaultProps = {
  type: 'create',
};

export default NewMedicine;
