import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Steps } from 'rsuite';
import styled from 'styled-components';
import { CRModal, Div, CRCard } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';

const initValue = {
  sessions: [],
  items: [],
};
const StepsDev = styled.div`
 margin-left:200px;
 margin-right: 200px;
`;
function FinishAppointment({ appointment, show, onCancel, onOk, clinic }) {
  const [activeStep, setActiveStep] = useState(0);
  const [discount, setDiscount] = useState(0);

  const value = useRef(initValue);

  const handleInvoiceChange = useCallback(sessions => {
    value.current = { ...value.current, sessions };
  }, []);

  const handleInventoryChange = useCallback(items => {
    value.current = { ...value.current, items };
  }, []);

  const handleOk = useCallback(() => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else {
      onOk({ ...value.current, discount });
    }
  }, [activeStep, onOk, discount]);

  const handleCancel = useCallback(() => {
    value.current = initValue;
    onCancel();
    setActiveStep(0);
  }, [onCancel]);

  const okTitle = useMemo(() => (activeStep === 0 ? 'Next' : 'Ok'), [
    activeStep,
  ]);

  return (
    <CRModal
      show={show}
      header="Finish Session"
      okTitle={okTitle}
      onOk={handleOk}
      onHide={handleCancel}
      onCancel={handleCancel}
      width={850}
      height={480}
      bodyStyle={{ padding: '0px' }}
      CancelFooter={true}
    >
      <StepsDev>
        <Steps current={activeStep}>
          <Steps.Item title="Invoice" />
          <Steps.Item title="Inventory" />
        </Steps>
      </StepsDev>
      {activeStep === 0 && (
        <AppointmentInvoice
          clinic={clinic}
          onChange={handleInvoiceChange}
          discount={discount}
          onDiscountChange={setDiscount}
          appointment={appointment}
        />
      )}
      {activeStep === 1 && <InventoryUsage onChange={handleInventoryChange} />}
    </CRModal>
  );
}

FinishAppointment.defaultProps = {
  sessions: [],
  clinic: {},
};

export default FinishAppointment;
