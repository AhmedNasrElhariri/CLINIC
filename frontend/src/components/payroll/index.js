import React, { useCallback, useMemo, useState } from 'react';
import { Div, MainContainer, CRButton, CRModal, H4 } from 'components';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import { CheckboxGroup, Checkbox } from 'rsuite';
import PayrollForm, { usePayrollForm } from './form';
import { Can } from 'components/user/can';
import EmployeesPayroll from './list-payrolls';
import { useModal, usePayroll, useAccounting } from 'hooks';
import { formatDate } from 'utils/date';
const initialPayrollusers = [];
const initValue = {
  employeeId: '',
  salary: '',
  orgUserId: null,
  name: '',
  amount: 0,
  option: 'amount',
  period: [],
  type: '',
  choice: 'revenue',
  hoursNumber: 0,
  hourPrice: 0,
  reason: '',
  percentage: 0,
  payment: [],
  userId: null,
  specialtyId: null,
  branchId: null,
};
const getAmount = (
  fv,
  totalRevenue,
  totalExpenses,
  totalUserPaymentCourses
) => {
  let amount = 0;
  if (fv.option === 'hours') {
    amount = fv.hoursNumber * fv.hourPrice;
  } else if (fv.option === 'percentage') {
    if (fv.choice === 'revenue') {
      amount = fv.percentage * 0.01 * totalRevenue;
    } else {
      amount = (totalRevenue - totalExpenses) * 0.01 * fv.percentage;
    }
  } else if (fv.option === 'courses') {
    amount = totalUserPaymentCourses * 0.01 * fv.percentage;
  } else {
    amount = fv.amount;
  }
  return Math.ceil(amount);
};

function Payroll() {
  const [formValue, setFormValue] = useState(initValue);
  const { visible, open, close } = useModal();
  const [period, setPeriod] = useState([]);
  const [checkedPayLipsUsers, setCheckPayLipsUsers] =
    useState(initialPayrollusers);
  const userId = formValue.employeeId;
  const { userId: doctorId, specialtyId, branchId } = formValue;
  const {
    addPayrollUser,
    payrollUsers,
    payslips,
    addTransaction,
    addPayroll,
    deleteUser,
    lastTransactionDate,
    lastTransactionRevenueDate,
    userCoursesPayment,
  } = usePayroll({ userId, period, doctorId, specialtyId, branchId });
  const view = ACCOUNTING_VIEWS.YEAR,
    updatedPeriod = formValue.period;
  const { BranchTotalRevenues, BranchTotalExpenses } = useAccounting({
    view,
    period,
    specialtyId: formValue.specialtyId,
    userId: formValue.userId,
    branchId: formValue.branchId,
  });
  const totalUserPaymentCourses = useMemo(
    () => userCoursesPayment.reduce((acc, e) => acc + e.payment, 0),
    [userCoursesPayment]
  );

  const amount = useMemo(
    () =>
      getAmount(
        formValue,
        BranchTotalRevenues,
        BranchTotalExpenses,
        totalUserPaymentCourses
      ),
    [
      formValue,
      totalUserPaymentCourses,
      BranchTotalRevenues,
      BranchTotalExpenses,
    ]
  );
  const handleAddUser = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.orgUserId,
      salary: formValue.salary,
    };
    addPayrollUser({
      variables: {
        payrollUser: updatedFormValue,
      },
    });
  }, [formValue, addPayrollUser]);
  const handleAddAdvance = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.employeeId,
      amount: amount,
      periodTime: period,
      option: formValue.option,
      reason: formValue.reason,
      type: 'Advance',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, amount, formValue.employeeId, period]);
  const handleAddCommision = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.employeeId,
      amount: amount,
      reason: formValue.reason,
      option: formValue.option,
      periodTime: period,
      type: 'Commision',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, amount, formValue.employeeId, period]);
  const handleAddIncentive = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.employeeId,
      amount: amount,
      reason: formValue.reason,
      option: formValue.option,
      periodTime: period,
      type: 'Incentive',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, amount, formValue.employeeId, period]);
  const handleAddDeduction = useCallback(() => {
    const updatedFormValue = {
      userId: formValue.employeeId,
      amount: amount,
      reason: formValue.reason,
      option: formValue.option,
      periodTime: period,
      type: 'Deduction',
    };
    addTransaction({
      variables: {
        payrollTransaction: updatedFormValue,
      },
    });
  }, [addTransaction, amount, formValue.employeeId, period]);
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
    period: period,
    lastDay: lastTransactionDate,
    lastRevenueDay: lastTransactionRevenueDate,
    setPeriod: setPeriod,
    setFormValue,
    payrollUsers,
  });
  const addIncentiveForm = usePayrollForm({
    header: 'Add Incentives',
    onOk: handleAddIncentive,
    lastDay: lastTransactionDate,
    lastRevenueDay: lastTransactionRevenueDate,
    type: 'Incentive',
    formValue: formValue,
    period: period,
    setPeriod: setPeriod,
    setFormValue,
    payrollUsers,
  });
  const addCommissionForm = usePayrollForm({
    header: 'Add Commission',
    onOk: handleAddCommision,
    lastDay: lastTransactionDate,
    lastRevenueDay: lastTransactionRevenueDate,
    formValue: formValue,
    type: 'Commision',
    period: period,
    setPeriod: setPeriod,
    setFormValue,
    payrollUsers,
  });
  const addDeductionForm = usePayrollForm({
    header: 'Add Deduction',
    onOk: handleAddDeduction,
    type: 'Deduction',
    lastDay: lastTransactionDate,
    lastRevenueDay: lastTransactionRevenueDate,
    formValue: formValue,
    setFormValue,
    period: period,
    setPeriod: setPeriod,
    payrollUsers,
  });
  const deletePayrollUser = usePayrollForm({
    header: 'Delete Payroll User',
    onOk: () => deletePayrollUserFun.handleDeleteUser,
    type: 'Delete',
    formValue: formValue,
    period: period,
    setPeriod: setPeriod,
    setFormValue,
    payrollUsers,
  });
  const addNewUser = usePayrollForm({
    header: 'Add New User',
    onOk: handleAddUser,
    formValue: formValue,
    period: period,
    setPeriod: setPeriod,
    type: 'addNewUser',
    setFormValue,
  });
  const handlePayPayslips = useCallback(() => {
    addPayroll({
      variables: {
        payment: checkedPayLipsUsers,
      },
    });
    close();
  }, [addPayroll, checkedPayLipsUsers]);
  return (
    <>
      <Can I="View" an="Payroll">
        <MainContainer
          title="Payroll Reports"
          more={
            <Div display="flex">
              <Can I="CreatePayslips" an="Payroll">
                <CRButton variant="primary" onClick={open} ml={1}>
                  Pay Payslips
                </CRButton>
              </Can>
              <CRButton variant="primary" onClick={addNewUser.show} ml={1}>
                Add New User
              </CRButton>
              <Can I="CreateAdvance" an="Payroll">
                <CRButton
                  variant="success"
                  onClick={addAdvanceForm.show}
                  ml={1}
                >
                  Add Advance
                </CRButton>
              </Can>
              <Can I="CreateIncentives" an="Payroll">
                <CRButton
                  variant="primary"
                  onClick={addIncentiveForm.show}
                  ml={1}
                >
                  Add Incentives
                </CRButton>
              </Can>
              <Can I="CreateCommission" an="Payroll">
                <CRButton
                  variant="primary"
                  onClick={addCommissionForm.show}
                  ml={1}
                >
                  Add Commission
                </CRButton>
              </Can>
              <Can I="CreateDeduction" an="Payroll">
                <CRButton
                  variant="danger"
                  onClick={addDeductionForm.show}
                  ml={1}
                >
                  Add Deduction
                </CRButton>
              </Can>
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
            <H4>{formatDate(new Date())}</H4>
            <CheckboxGroup
              inline
              name="payrolluserIds"
              value={checkedPayLipsUsers}
              onChange={val => setCheckPayLipsUsers(val)}
            >
              {payslips.map(pa => (
                <Div
                  display="flex"
                  backgroundColor="#eef1f1"
                  borderBottom="2px solid #ffffff"
                  borderLeft="5px solid #51C6F3"
                >
                  <Div
                    width={200}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRight="2px solid #ffffff"
                  >
                    {pa.name}
                  </Div>
                  <Div
                    width={200}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRight="2px solid #ffffff"
                  >
                    {pa.amount}
                  </Div>
                  <Div
                    width={200}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Checkbox value={pa.id}></Checkbox>
                  </Div>
                </Div>
              ))}
            </CheckboxGroup>
          </CRModal>
        }
      </Can>
    </>
  );
}

export default Payroll;
