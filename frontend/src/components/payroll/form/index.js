import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { Form, Schema, Alert, SelectPicker } from 'rsuite';
import { mapArrWithIdsToChoices } from 'utils/misc';
import {
  CRModal,
  CRTextInput,
  CRNumberInput,
  CRDatePicker,
  CRSelectInput,
} from 'components';
import { isValid } from 'services/form';
import { usePermissions } from 'hooks';

const { StringType, DateType, NumberType } = Schema.Types;

const model = Schema.Model({
  userId: StringType().isRequired('Name Type is required'),
  salary: NumberType().isRequired('Amount value is required'),
});
const initValue = {
  userId: '',
  salary: '',
};

export const usePayrollForm = ({
  header,
  onOk,
  formValue,
  setFormValue,
  type,
}) => {
  const [visible, setVisible] = useState(false);

  const onCancel = useCallback(() => {
    setFormValue(initValue);
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    formValue,
    setFormValue,
    visible,
    close,
    show,
    hide,
    header,
    onOk,
    type,
    onCancel,
    onChange: setFormValue,
    model,
  };
};

const PayrollForm = ({
  visible,
  onCancel,
  onOk,
  formValue,
  onChange,
  header,
  model,
  type,
  close,
}) => {
  const { users } = usePermissions({});
  const ref = useRef();
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        onOk();
        close();
      }}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <Form
        formValue={formValue}
        model={model}
        onChange={onChange}
        ref={ref}
        fluid
      >
        <CRSelectInput
          label="User"
          name="userId"
          placeholder="Select User"
          block
          cleanable={false}
          searchable={false}
          accepter={SelectPicker}
          data={mapArrWithIdsToChoices(users)}
        />
        {type.length == 0 ? (
          <CRNumberInput label="Salary" name="salary" block></CRNumberInput>
        ) : (
          <></>
        )}
        {type.length != 0 ? (
          <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
        ) : (
          <></>
        )}
      </Form>
    </CRModal>
  );
};

PayrollForm.propTypes = {};

export default memo(PayrollForm);
