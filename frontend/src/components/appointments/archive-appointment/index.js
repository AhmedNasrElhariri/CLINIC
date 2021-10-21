import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Steps } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import styled from 'styled-components';
import { CRModal, Div } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import { useConfigurations, useCompanySessionDefinition } from 'hooks';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';

const initValue = {
  sessions: [],
  items: [],
};
const initlOption = {
  option: '',
  amount: 0,
  payMethod: 'cash',
};

const StepsDev = styled.div`
  width: 450px;
  margin: auto;
`;

const ArchiveAppointment = ({ appointment, show, onCancel, onOk, loading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [others, setOthers] = useState(0);
  const [othersName, setOthersName] = useState('');
  const [bank, setBank] = useState(null);
  const [company, setCompany] = useState(null);
  const [option, setOption] = useState(initlOption);
  const value = useRef(initValue);
  const { data } = useQuery(GET_INVOICE_COUNTER, {
    fetchPolicy: 'network-only',
  });
  const organization = useMemo(
    () => R.propOr([], 'myInvoiceCounter')(data),
    [data]
  );
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
      onOk({
        ...value.current,
        discount,
        others,
        othersName,
        bank,
        company,
        option,
      });
      setActiveStep(0);
      setOthers(0);
      setBank(null);
      setCompany(null);
      setOthersName('');
      setDiscount(0);
      value.current = {
        sessions: [],
        items: [],
      };
    }
  }, [activeStep, onOk, discount, others, bank, company, option]);
  const handleFinish = useCallback(() => {
    onOk({
      ...value.current,
      discount,
      others,
      othersName,
      bank,
      company,
      option,
    });
    setActiveStep(0);
    setOthers(0);
    setBank(null);
    setCompany(null);
    setOthersName('');
    setDiscount(0);
    value.current = {
      sessions: [],
      items: [],
    };
  }, [onOk, discount, others, bank, company, option]);

  const handleCancel = useCallback(() => {
    if (activeStep === 1) {
      value.current = { ...value.current, discount, others };
      setActiveStep(0);
    }
  }, [activeStep, discount, others]);
  const okTitle = useMemo(
    () => (activeStep === 0 ? 'Next' : 'Ok'),
    [activeStep]
  );
  const { companysSessionDefinition } = useCompanySessionDefinition({});
  const companySessions = useMemo(
    () => companysSessionDefinition.filter(s => s.company.id === company),
    [company]
  );
  const updatedCompanySessions = companySessions.map(cS => {
    return {
      name: cS.name,
      price: cS.price,
    };
  });
  return (
    <CRModal
      show={show}
      header="Archive Appointment"
      okTitle={okTitle}
      z
      onOk={handleOk}
      loading={loading}
      onHide={() => {
        onCancel();
        setActiveStep(0);
      }}
      onCancel={handleCancel}
      width={850}
      height={480}
      bodyStyle={{ paddingLeft: 47, paddingRight: 47, margin: 0 }}
    >
      <StepsDev>
        <Steps current={activeStep}>
          <Steps.Item title="Invoice" onClick={() => setActiveStep(0)} />
          <Steps.Item title="Inventory" onClick={() => setActiveStep(1)} />
        </Steps>
      </StepsDev>
      <Div>
        {activeStep === 0 && (
          <AppointmentInvoice
            onChange={handleInvoiceChange}
            discount={discount}
            others={others}
            othersName={othersName}
            bank={bank}
            setBank={setBank}
            company={company}
            setCompany={setCompany}
            onOthersChange={setOthers}
            onOthersNameChange={setOthersName}
            onDiscountChange={setDiscount}
            appointment={appointment}
            option={option}
            setOption={setOption}
            sessions={updatedCompanySessions}
            organization={organization}
            handleOk={handleOk}
            onCancel={handleCancel}
            handleFinish={handleFinish}
            loading={loading}
          />
        )}
        {activeStep === 1 && (
          <InventoryUsage
            onChange={handleInventoryChange}
            handleCancel={handleCancel}
          />
        )}
      </Div>
    </CRModal>
  );
};

ArchiveAppointment.defaultProps = {
  sessions: [],
};

export default ArchiveAppointment;
