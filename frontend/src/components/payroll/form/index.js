import React, { useState, useRef, useCallback, memo } from 'react';
import { Form } from 'rsuite';
import { CRModal, CRNumberInput, CRSelectInput, CRRadio } from 'components';
import { usePayroll } from 'hooks';
import styled from 'styled-components';
import { CRTextInput } from 'components/widgets';
import CourseToolbar from './toolbar-courses';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
              label={t('user')}
              name="orgUserId"
              errorMessage={
                showError && checkResult['orgUserId']?.hasError
                  ? checkResult['orgUserId']?.errorMessage
                  : ''
              }
              // placeholder="Select User"
              block
              data={organizationusers}
            />
            <CRNumberInput
              label={t('salary')}
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
              label={t('user')}
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
              label={t('selectOneOption')}
              name="option"
              options={options}
            />
            {formValue.option === 'amount' ? (
              (type === 'Deduction' ||
                type === 'Commision' ||
                type === 'Incentive' ||
                type === 'Advance') && (
                <CRNumberInput
                  label={t('revenueAmount')}
                  name="amount"
                  block
                ></CRNumberInput>
              )
            ) : formValue.option === 'hours' ? (
              <>
                <CRNumberInput
                  label={t('numberOfHourse')}
                  name="hoursNumber"
                  block
                ></CRNumberInput>
                <CRNumberInput
                  label={t('priceOfHours')}
                  name="hourPrice"
                  block
                ></CRNumberInput>
              </>
            ) : formValue.option === 'courses' ? (
              <>
                <CRNumberInput
                  label="Percentage from 0 - 100"
                  name="percentage"
                  block
                ></CRNumberInput>

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
