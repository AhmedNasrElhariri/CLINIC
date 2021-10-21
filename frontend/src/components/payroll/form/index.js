import React, { useState, useRef, useCallback, memo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRNumberInput,
  CRSelectInput,
  CRRadio,
  CRBrancheTree,
} from 'components';
import { ACTIONS } from 'utils/constants';
import { usePayroll } from 'hooks';
import styled from 'styled-components';
import { CRTextInput } from 'components/widgets';
import Toolbar from './toolbar';
import CourseToolbar from './toolbar-courses';

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

const options = [
  { name: 'Amount Only', value: 'amount' },
  // { name: 'Percentage of Revenue', value: 'percentage' },
  { name: 'Hours', value: 'hours' },
  { name: 'Courses', value: 'courses' },
];
const options2 = [
  { name: 'Profit', value: 'profit' },
  { name: 'Revenue', value: 'revenue' },
];

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
  lastDay,
  lastRevenueDay,
  period,
  setPeriod,
  payslips,
  checkResult,
  validate,
  showError,
  setShow,
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
    period,
    setPeriod,
    payslips,
    lastDay,
    lastRevenueDay,
    onCancel,
    onChange: setFormValue,
    checkResult,
    validate,
    showError,
    setShow,
  };
};

const PayrollForm = ({
  visible,
  onCancel,
  onOk,
  formValue,
  onChange,
  header,
  lastDay,
  setPeriod,
  type,
  payrollUsers,
  close,
  loading,
  checkResult,
  validate,
  showError,
  setShow,
}) => {
  const ref = useRef();
  const { organizationusers } = usePayroll({});
  const updatedPayrollUsers = payrollUsers?.map(u => {
    return {
      id: u.id,
      name: u.user.name,
    };
  });
  return (
    <CRModal
      show={visible}
      header={header}
      loading={loading}
      onOk={() => {
        setShow(true);
        onOk();
        validate && close();
      }}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <Form formValue={formValue} onChange={onChange} ref={ref} fluid>
        {type === 'Delete' ? (
          <DeleteMessage>
            Are you sure you want to delete this user?
          </DeleteMessage>
        ) : type === 'addNewUser' ? (
          <>
            <CRSelectInput
              label="User"
              name="orgUserId"
              errorMessage={
                showError && checkResult['orgUserId']?.hasError
                  ? checkResult['orgUserId']?.errorMessage
                  : ''
              }
              placeholder="Select User"
              block
              data={organizationusers}
            />
            <CRNumberInput
              label="Salary"
              name="salary"
              errorMessage={
                showError && checkResult['salary']?.hasError
                  ? checkResult['salary']?.errorMessage
                  : ''
              }
              block
            ></CRNumberInput>
          </>
        ) : (
          <>
            <CRSelectInput
              label="User"
              name="employeeId"
              errorMessage={
                showError && checkResult['employeeId']?.hasError
                  ? checkResult['employeeId']?.errorMessage
                  : ''
              }
              placeholder="Select User"
              block
              data={updatedPayrollUsers}
            />
            <CRTextInput label="Reason" name="reason" block></CRTextInput>
            <CRRadio
              label="Select one Option"
              name="option"
              options={options}
            />
            {formValue.option === 'amount' ? (
              (type === 'Deduction' ||
                type === 'Commision' ||
                type === 'Incentive' ||
                type === 'Advance') && (
                <CRNumberInput
                  label="Amount"
                  name="amount"
                  block
                ></CRNumberInput>
              )
            ) : formValue.option === 'hours' ? (
              <>
                <CRNumberInput
                  label="Number of Hourse"
                  name="hoursNumber"
                  block
                ></CRNumberInput>
                <CRNumberInput
                  label="Price of Hours"
                  name="hourPrice"
                  block
                ></CRNumberInput>
              </>
            ) : // : formValue.option === 'percentage' ? (
            //   <>
            //     <CRNumberInput
            //       label="Percentage from 0 - 100"
            //       name="percentage"
            //       block
            //     ></CRNumberInput>
            //     {/* <InputNumber
            //       max={100}
            //       min={0}
            //       name="percentage"
            //       onChange={val => onChange({ ...formValue, percentage: val })}
            //     /> */}
            //     <CRRadio
            //       label="Select one Choice"
            //       name="choice"
            //       options={options2}
            //       style={{ marginBottom: '10px' }}
            //     />
            //     <CRBrancheTree
            //       formValue={formValue}
            //       onChange={onChange}
            //       action={ACTIONS.CreateCommission_Payroll}
            //     />
            //     <Toolbar
            //       onChangePeriod={setPeriod}
            //       lastTimeFrameDay={lastRevenueDay}
            //     />
            //   </>
            // )
            formValue.option === 'courses' ? (
              <>
                <CRNumberInput
                  label="Percentage from 0 - 100"
                  name="percentage"
                  block
                ></CRNumberInput>
                {/* <CRBrancheTree
                  formValue={formValue}
                  onChange={onChange}
                  action={ACTIONS.CreateCommission_Payroll}
                /> */}
                <CourseToolbar
                  onChangePeriod={setPeriod}
                  lastTimeFrameDay={lastDay}
                />
              </>
            ) : (
              <></>
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
