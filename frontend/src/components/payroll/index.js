import React, { useCallback, useState } from 'react';

import { Div, MainContainer, CRButton } from 'components';
import { Can } from 'components/user/can';
import PayRollForm, { usePayrollForm } from './form';
import EmployeesPayroll from './list-payrolls';
import { usePayRoll } from 'hooks';
const initValue = {
  userId: '',
  salary: '',
  amount: '',
  type: '',
};
let type = '';
function PayRoll() {
  const [formValue, setFormValue] = useState(initValue);
  const { addPayRollUser, payRollUsers, addTransaction } = usePayRoll({});
  const handleAddUser = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      salary: formValue.salary,
    };
    addPayRollUser({
      variables: {
        payRollUser: updatedFormValue,
      },
    });
  }, [formValue, addPayRollUser, type]);
  const handleAddAdvance = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Advance',
    };
    addTransaction({
      variables: {
        payRollTransaction: updatedFormValue,
      },
    });
  }, [formValue]);

  const handleAddCommision = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Commision',
    };
    addTransaction({
      variables: {
        payRollTransaction: updatedFormValue,
      },
    });
  }, [formValue]);
  const handleAddIncentive = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Incentive',
    };
    addTransaction({
      variables: {
        payRollTransaction: updatedFormValue,
      },
    });
  }, [formValue]);
  const handleAddDeduction = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Deduction',
    };
    addTransaction({
      variables: {
        payRollTransaction: updatedFormValue,
      },
    });
  }, [formValue]);
  const addAdvanceForm = usePayrollForm({
    header: 'Add Advance',
    onOk: handleAddAdvance,
    formValue: formValue,
    type:'Advance',
    setFormValue: setFormValue,
  });
  const addIncentiveForm = usePayrollForm({
    header: 'Add Incentives',
    onOk: handleAddIncentive,
    type: 'Incentive',
    formValue: formValue,
    setFormValue: setFormValue,
  });
  const addCommissionForm = usePayrollForm({
    header: 'Add Commission',
    onOk: handleAddCommision,
    formValue: formValue,
    type: 'Commision',
    setFormValue: setFormValue,
  });
  const addDeductionForm = usePayrollForm({
    header: 'Add Deduction',
    onOk: handleAddDeduction,
    type: 'Deduction',
    formValue: formValue,
    setFormValue: setFormValue,
  });
  const addNewUser = usePayrollForm({
    header: 'Add New User',
    onOk: handleAddUser,
    formValue: formValue,
    type: '',
    setFormValue: setFormValue,
  });
  return (
    <>
      <Can I="view" an="Report">
        <MainContainer
          title="Payroll Reports"
          more={
            <Div display="flex">
              <CRButton variant="primary" onClick={addNewUser.show} ml={1}>
                Add New User
              </CRButton>
              <CRButton variant="success" onClick={addAdvanceForm.show} ml={1}>
                Add Advance
              </CRButton>
              <CRButton
                variant="primary"
                onClick={addIncentiveForm.show}
                ml={1}
              >
                Add Incentives
              </CRButton>
              <CRButton
                variant="primary"
                onClick={addCommissionForm.show}
                ml={1}
              >
                Add Commission
              </CRButton>
              <CRButton variant="danger" onClick={addDeductionForm.show} ml={1}>
                Add Deduction
              </CRButton>
            </Div>
          }
          nobody
        ></MainContainer>
        <PayRollForm {...addAdvanceForm} />
        <PayRollForm {...addIncentiveForm} />
        <PayRollForm {...addCommissionForm} />
        <PayRollForm {...addDeductionForm} />
        <PayRollForm {...addNewUser} />
        <EmployeesPayroll payRollUsers={payRollUsers} />
      </Can>
    </>
  );
}

export default PayRoll;
