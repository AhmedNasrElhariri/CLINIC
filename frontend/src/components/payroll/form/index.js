import React, { useState, useRef, useCallback, memo } from 'react';
import { Form, Schema } from 'rsuite';
import { CRModal, CRNumberInput, CRSelectInput } from 'components';
import styled from 'styled-components';
import { CRTextInput } from 'components/widgets';
const { StringType, NumberType } = Schema.Types;

const DeleteMessage = styled.div`
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #283148;
`;
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
  payrollUsers,
  payslips,
}) => {
  const [visible, setVisible] = useState(false);

  const onCancel = useCallback(() => {
    setFormValue(initValue);
    setVisible(false);
  }, [setFormValue]);

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
    payrollUsers,
    payslips,
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
  payrollUsers,
  payslips,
  close,
}) => {
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
        {type === 'Delete' ? (
          <DeleteMessage>
            Are you sure you want to delete this user?
          </DeleteMessage>
        ) : type === 'addNewUser' ? (
          <>
            <CRTextInput label="name" name="name" block></CRTextInput>
            <CRNumberInput label="Salary" name="salary" block></CRNumberInput>
          </>
        ) : (
          <>
            <CRSelectInput
              label="User"
              name="userId"
              placeholder="Select User"
              block
              data={payrollUsers}
            />
            {(type === 'Deduction' ||
              type === 'Commision' ||
              type === 'Incentive' ||
              type === 'Advance') && (
              <CRNumberInput label="Amount" name="amount" block></CRNumberInput>
            )}
          </>
        )}
      </Form>
    </CRModal>
  );
};

PayrollForm.defaultProps = {
  payslips: [],
};

export default memo(PayrollForm);
