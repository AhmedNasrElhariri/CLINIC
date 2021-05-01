import React, { useCallback, useState } from 'react';

import { Div, MainContainer, CRButton, CRTable, CRModal } from 'components';
import PayrollForm, { usePayrollForm } from './form';
import EmployeesPayroll from './list-payrolls';
import { useModal, usePayroll, usePermissions } from 'hooks';
import { height } from 'styled-system';
import { CRCard } from 'components/widgets';
const initValue = {
  userId: '',
  salary: '',
  amount: '',
  type: '',
  payment: [],
};

function Payroll() {
  const [formValue, setFormValue] = useState(initValue);
  const { visible, open, close } = useModal();
  const userId = formValue.userId;
  const { users } = usePermissions();
  const {
    addPayrollUser,
    payrollUsers,
    payslips,
    addTransaction,
    addPayroll,
    deleteUser,
  } = usePayroll({ userId });

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
    addPayroll({
      variables: {
        payment: formValue.payment,
      },
    });
  }, [addPayroll, formValue.payment]);
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
  const deletePayrollUserFun = userId => {
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
    setFormValue,
    payrollUsers,
  });
  const addIncentiveForm = usePayrollForm({
    header: 'Add Incentives',
    onOk: handleAddIncentive,
    type: 'Incentive',
    formValue: formValue,
    setFormValue,
    payrollUsers,
  });
  const addCommissionForm = usePayrollForm({
    header: 'Add Commission',
    onOk: handleAddCommision,
    formValue: formValue,
    type: 'Commision',
    setFormValue,
    payrollUsers,
  });
  const addDeductionForm = usePayrollForm({
    header: 'Add Deduction',
    onOk: handleAddDeduction,
    type: 'Deduction',
    formValue: formValue,
    setFormValue,
    payrollUsers,
  });
  const deletePayrollUser = usePayrollForm({
    header: 'Delete Payroll User',
    onOk: () => deletePayrollUserFun.handleDeleteUser,
    type: 'Delete',
    formValue: formValue,
    setFormValue,
    payrollUsers,
  });
  const addNewUser = usePayrollForm({
    header: 'Add New User',
    onOk: handleAddUser,
    formValue: formValue,
    type: 'addNewUser',
    setFormValue,
    payrollUsers: users,
  });
  const handlePayPayslips = useCallback(() => {
    addPayroll({
      variables: {
        payment: payrollUsers.map(u => u.id),
      },
    });
    close();
  }, [addPayroll, payrollUsers]);
  return (
    <>
      <MainContainer
        title="Payroll Reports"
        more={
          <Div display="flex">
            <CRButton variant="primary" onClick={open} ml={1}>
              Pay Payslips
            </CRButton>
            <CRButton variant="primary" onClick={addNewUser.show} ml={1}>
              Add New User
            </CRButton>
            <CRButton variant="success" onClick={addAdvanceForm.show} ml={1}>
              Add Advance
            </CRButton>
            <CRButton variant="primary" onClick={addIncentiveForm.show} ml={1}>
              Add Incentives
            </CRButton>
            <CRButton variant="primary" onClick={addCommissionForm.show} ml={1}>
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
      <PayrollForm {...deletePayrollUser} />
      <EmployeesPayroll
        payrollUsers={payrollUsers}
        handleDelete={deletePayrollUserFun}
      />
      {
        <CRModal
          show={visible}
          onOk={handlePayPayslips}
          onHide={close}
          onCancel={close}
          header="Payslips"
          bodyStyle={{ minWidth: 300 }}
        >
          <CRTable autoHeight data={payslips}>
            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
              <CRTable.CRCell dataKey="name" semiBold />
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Amount</CRTable.CRHeaderCell>
              <CRTable.CRCell dataKey="amount" semiBold />
            </CRTable.CRColumn>
          </CRTable>
        </CRModal>
      }
    </>
  );
}

export default Payroll;
