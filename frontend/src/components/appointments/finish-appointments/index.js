import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Steps } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import styled from 'styled-components';
import { CRModal, Div, CRCard } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import useConfigurations from 'hooks/configurations';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';

const initValue = {
  sessions: [],
  items: [],
};

const StepsDev = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;
const FinishAppointment = ({ appointment, show, onCancel, onOk, clinic }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [discount, setDiscount] = useState(0);
  const value = useRef(initValue);

  const { sessions } = useConfigurations();
  const { data } = useQuery(GET_INVOICE_COUNTER, {
    fetchPolicy: 'network-only',
  });
  const organization = useMemo(() => R.propOr([], 'myInvoiceCounter')(data), [
    data,
  ]);
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
    if (activeStep === 1) {
      value.current = { ...value.current, discount };
      setActiveStep(0);
    }
  }, [activeStep, discount]);

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
          handleOk={handleOk}
        />
      )}
      {activeStep === 1 && (
        <InventoryUsage
          onChange={handleInventoryChange}
          handleCancel={handleCancel}
        />
      )}
    </CRModal>
  );
};

FinishAppointment.defaultProps = {
  sessions: [],
};

export default FinishAppointment;
