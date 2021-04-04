import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Steps } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import styled from 'styled-components';
import { CRModal, Div, CRButton } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import { useConfigurations } from 'hooks';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';
import { ButtonsDiv } from '../appointment-invoice/style';
import PrintInvoice from '../print-invoice';

const initValue = {
  sessions: [],
  items: [],
};

const StepsDev = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;
const FinishAppointment = ({ appointment, show, onCancel, onOk }) => {
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
    if (activeStep !== 1) {
      setActiveStep(activeStep + 1);
    } else {
      console.log('hd');
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
      onHide={onCancel}
      onCancel={handleCancel}
      width={850}
      height={480}
      bodyStyle={{ padding: '0px' }}
      // CRFooter={
      //   <ButtonsDiv>
      //     <PrintInvoice
      //       items={selectedSessions}
      //       subtotal={subtotal}
      //       total={total}
      //       discount={discount}
      //       organization={organization}
      //     />
      //     <CRButton
      //       width="81px"
      //       padding="9px 24px 10px 25px"
      //       bgColor="#b6b7b7"
      //       color="#283148"
      //       marginLeft="370px"
      //       height="35px"
      //       onClick={onCancel}
      //     >
      //       Cancel
      //     </CRButton>
      //     <CRButton
      //       width="106px"
      //       padding="9px 40px"
      //       bgColor="#50c7f2"
      //       color="#ffffff"
      //       marginLeft="26px"
      //       height="35px"
      //       onClick={handleOk}
      //     >
      //       Next
      //     </CRButton>
      //   </ButtonsDiv>
      // }
    >
      <StepsDev>
        <Steps current={activeStep}>
          <Steps.Item title="Invoice" />
          <Steps.Item title="Inventory" />
        </Steps>
      </StepsDev>
      <Div>
        {activeStep === 0 && (
          <AppointmentInvoice
            onChange={handleInvoiceChange}
            discount={discount}
            onDiscountChange={setDiscount}
            appointment={appointment}
            sessions={sessions}
            organization={organization}
            handleOk={handleOk}
            onCancel={handleCancel}
          />
        )}
        {activeStep === 1 && (
          <InventoryUsage
            onChange={handleInventoryChange}
            handleCancel={handleCancel}
          />
        )}
      </Div>
      {/* <ButtonsDiv>
        <PrintInvoice
          items={selectedSessions}
          subtotal={subtotal}
          total={total}
          discount={discount}
          organization={organization}
        />
        <Button
          width="81px"
          padding="9px 24px 10px 25px"
          bgColor="#b6b7b7"
          color="#283148"
          marginLeft="370px"
          height="35px"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          width="106px"
          padding="9px 40px"
          bgColor="#50c7f2"
          color="#ffffff"
          marginLeft="26px"
          height="35px"
          onClick={handleOk}
        >
          Next
        </Button>
      </ButtonsDiv> */}
      {/* <PrintInvoice
        items={selectedSessions}
        subtotal={subtotal}
        total={total}
        discount={discount}
        organization={organization}
      /> */}
    </CRModal>
  );
};

FinishAppointment.defaultProps = {
  sessions: [],
};

export default FinishAppointment;
