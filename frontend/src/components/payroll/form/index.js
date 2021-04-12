import React, { useState, useRef, useCallback, memo } from 'react';
import { Form, Schema, SelectPicker } from 'rsuite';
import { mapArrWithIdsToChoices } from 'utils/misc';
import { CRModal, CRNumberInput, CRSelectInput, CRCheckBox } from 'components';
import { isValid } from 'services/form';
import { usePermissions } from 'hooks';
import styled from 'styled-components';
const { StringType, DateType, NumberType } = Schema.Types;

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
  payRollUsers,
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
    payRollUsers,
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
  payRollUsers,
  close,
}) => {
  const { users } = usePermissions({});
  const ref = useRef();
  const payRollUsersCheck = payRollUsers.map(user => {
    return {
      name: `${user.user.name} ${user.netSalary}`,
      value: user.netSalary,
    };
  });
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
        ) : (
          <>
            {type === 'addPayRoll' ? (
              <>
                <CRCheckBox
                  name="payment"
                  options={payRollUsersCheck}
                ></CRCheckBox>
              </>
            ) : (
              <>
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
                {type === 'addNewUser' ? (
                  <CRNumberInput
                    label="Salary"
                    name="salary"
                    block
                  ></CRNumberInput>
                ) : (
                  <></>
                )}
                {type === 'Deduction' ||
                type === 'Commision' ||
                type === 'Incentive' ||
                type === 'Advance' ? (
                  <CRNumberInput
                    label="Amount"
                    name="amount"
                    block
                  ></CRNumberInput>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </Form>
    </CRModal>
  );
};

PayrollForm.propTypes = {};

export default memo(PayrollForm);
