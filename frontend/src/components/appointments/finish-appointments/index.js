import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Steps } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { CRModal, Div, CRCard } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import useConfigurations from 'hooks/configurations';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';

const initValue = {
  sessions: [],
  items: [],
};

function FinishAppointment({ appointment, show, onCancel, onOk}) {
  const [activeStep, setActiveStep] = useState(0);
  const [discount, setDiscount] = useState(0);
  const value = useRef(initValue);

  const { sessions } = useConfigurations();
  const { data } = useQuery(GET_INVOICE_COUNTER,{ fetchPolicy: "network-only" });
  const organization = useMemo(
    () => R.propOr([], 'myInvoiceCounter')(data),
    [data],
    [data]
  );
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
      width={1000}
    >
      <Steps current={activeStep}>
        <Steps.Item title="Invoice" />
        <Steps.Item title="Inventory" />
      </Steps>
      <Div mt={4}>
        <CRCard>
          {activeStep === 0 && (
            <AppointmentInvoice
              onChange={handleInvoiceChange}
              discount={discount}
              onDiscountChange={setDiscount}
              appointment={appointment}
              sessions={sessions}
              organization={organization}
            />
          )}
          {activeStep === 1 && (
            <InventoryUsage onChange={handleInventoryChange} />
          )}
        </CRCard>
      </Div>
    </CRModal>
  );
}

FinishAppointment.defaultProps = {
  sessions: [],
};

export default FinishAppointment;
