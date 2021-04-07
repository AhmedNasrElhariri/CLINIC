import React from 'react';

import { Div, MainContainer, CRButton } from 'components';
import { Can } from 'components/user/can';
import PayRollForm, { usePayrollForm } from './form';
import EmployeesPayroll from './list-payrolls';

function PayRoll() {
  const handleAddAdvance = payload => {
    console.dir(payload);
  };
  const addAdvanceForm = usePayrollForm({
    header: 'Add Advance',
    onOk: handleAddAdvance,
  });
  const addIncentiveForm = usePayrollForm({
    header: 'Add Incentives',
    onOk: handleAddAdvance,
  });
  const addCommissionForm = usePayrollForm({
    header: 'Add Commission',
    onOk: handleAddAdvance,
  });
  const addDeductionForm = usePayrollForm({
    header: 'Add Deduction',
    onOk: handleAddAdvance,
  });
  return (
    <>
      <Can I="view" an="Report">
        <MainContainer
          title="Payroll Reports"
          more={
            <Div display="flex">
              <CRButton variant="success" onClick={addAdvanceForm.show}>
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
        <EmployeesPayroll />
      </Can>
    </>
  );
}

export default PayRoll;
