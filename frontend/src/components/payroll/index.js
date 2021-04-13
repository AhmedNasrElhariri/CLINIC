import React, { useCallback, useState } from 'react';

import { Div, MainContainer, CRButton } from 'components';
import { Can } from 'components/user/can';
import PayrollForm, { usePayrollForm } from './form';
import EmployeesPayroll from './list-payrolls';
import { usePayroll } from 'hooks';
const initValue = {
  userId: '',
  salary: '',
  amount: '',
  type: '',
  payment: [],
};
let type = '';
function Payroll() {
  const [formValue, setFormValue] = useState(initValue);
  const {
    addPayrollUser,
    payrollUsers,
    addTransaction,
    addPayrollPayment,
    deleteUser,
  } = usePayroll({});
  const handleAddUser = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      salary: formValue.salary,
    };
    addPayrollUser({
      variables: {
        payrollUser: updatedFormValue,
      },
    });
  }, [formValue, addPayrollUser]);
  const handleAddPayroll = useCallback(() => {
    let payment = 0;
    formValue.payment.map(pay => {
      payment += pay;
    });
    addPayrollPayment({
      variables: {
        payment: payment,
      },
    });
  }, [addPayrollPayment, formValue.payment]);
  const handleAddAdvance = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Advance',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, formValue.amount, formValue.userId]);

  const handleAddCommision = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Commision',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, formValue.amount, formValue.userId]);
  const handleAddIncentive = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Incentive',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, formValue.amount, formValue.userId]);
  const handleAddDeduction = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.userId,
      amount: formValue.amount,
      type: 'Deduction',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, formValue.amount, formValue.userId]);
  const deletePayrollUserFun = (userId) => {
    //deletePayrollUser.show();
    deleteUser({
      variables: {
        userId: userId,
      },
    });
  };
  const addAdvanceForm = usePayrollForm({
    header: 'Add Advance',
    onOk: handleAddAdvance,
    formValue: formValue,
    type: 'Advance',
    setFormValue: setFormValue,
    payrollUsers: payrollUsers,
  });
  const addPayroll = usePayrollForm({
    header: 'Add Payroll',
    onOk: handleAddPayroll,
    formValue: formValue,
    type: 'addPayroll',
    payrollUsers: payrollUsers,
    setFormValue: setFormValue,
  });
  const addIncentiveForm = usePayrollForm({
    header: 'Add Incentives',
    onOk: handleAddIncentive,
    type: 'Incentive',
    formValue: formValue,
    setFormValue: setFormValue,
    payrollUsers: payrollUsers,
  });
  const addCommissionForm = usePayrollForm({
    header: 'Add Commission',
    onOk: handleAddCommision,
    formValue: formValue,
    type: 'Commision',
    setFormValue: setFormValue,
    payrollUsers: payrollUsers,
  });
  const addDeductionForm = usePayrollForm({
    header: 'Add Deduction',
    onOk: handleAddDeduction,
    type: 'Deduction',
    formValue: formValue,
    setFormValue: setFormValue,
    payrollUsers: payrollUsers,
  });
  const deletePayrollUser = usePayrollForm({
    header: 'Delete Payroll User',
    onOk: () => deletePayrollUserFun.handleDeleteUser,
    type: 'Delete',
    formValue: formValue,
    setFormValue: setFormValue,
    payrollUsers: payrollUsers,
  });
  const addNewUser = usePayrollForm({
    header: 'Add New User',
    onOk: handleAddUser,
    formValue: formValue,
    type: 'addNewUser',
    setFormValue: setFormValue,
    payrollUsers: payrollUsers,
  });
  return (
    <>
      <Can I="view" an="Report">
        <MainContainer
          title="Payroll Reports"
          more={
            <Div display="flex">
              <CRButton variant="primary" onClick={addPayroll.show} ml={1}>
                Add Payroll
              </CRButton>
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
        <PayrollForm {...addAdvanceForm} />
        <PayrollForm {...addIncentiveForm} />
        <PayrollForm {...addCommissionForm} />
        <PayrollForm {...addDeductionForm} />
        <PayrollForm {...addNewUser} />
        <PayrollForm {...addPayroll} />
        <PayrollForm {...deletePayrollUser} />
        <EmployeesPayroll
          payrollUsers={payrollUsers}
          handleDelete={deletePayrollUserFun}
        />
      </Can>
    </>
  );
}

export default Payroll;
