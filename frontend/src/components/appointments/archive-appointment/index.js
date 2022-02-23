import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Steps } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import styled from 'styled-components';
import { CRModal, Div } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import DoctorsTab from '../doctors-tab';
import {
  useConfigurations,
  useCompanySessionDefinition,
  usePatients,
} from 'hooks';
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
const initialDoctorFess = {
  doctorId: null,
  fees: 0,
  doctorName: '',
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
  const [cashPayment, setCashPayment] = useState(0);
  const [company, setCompany] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [couponsValue, setCouponsValue] = useState(0);
  const [option, setOption] = useState(initlOption);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [doctorFees, setDoctorFees] = useState(initialDoctorFess);
  const value = useRef(initValue);
  const { patientCoupons } = usePatients({
    patientId: appointment?.patient.id,
    all: false,
  });
  const newCoupons = useMemo(() => {
    let newCouponsObject = [];
    for (const [key, value] of Object.entries(coupons)) {
      const object = { id: key, value: value };
      newCouponsObject.push(object);
    }
    return newCouponsObject;
  }, [coupons]);
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
    if (activeStep !== 2) {
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
        coupons: newCoupons,
        couponsValue,
        doctorFees,
      });
      setActiveStep(0);
      setOthers(0);
      setBank(null);
      setCompany(null);
      setOthersName('');
      setDiscount(0);
      setCoupons([]);
      setCouponsValue(0);
      setSelectedSessions([]);
      setDoctorFees(initialDoctorFess);
      value.current = {
        sessions: [],
        items: [],
      };
    }
  }, [
    activeStep,
    onOk,
    discount,
    others,
    othersName,
    bank,
    company,
    option,
    coupons,
    couponsValue,
    doctorFees,
  ]);
  const handleFinish = useCallback(() => {
    onOk({
      ...value.current,
      discount,
      others,
      othersName,
      bank,
      company,
      option,
      coupons: newCoupons,
      couponsValue,
      doctorFees,
    });
    setActiveStep(0);
    setOthers(0);
    setBank(null);
    setCompany(null);
    setOthersName('');
    setDiscount(0);
    setCoupons([]);
    setCouponsValue(0);
    setSelectedSessions([]);
    setDoctorFees(initialDoctorFess);
    value.current = {
      sessions: [],
      items: [],
    };
  }, [
    onOk,
    discount,
    others,
    othersName,
    bank,
    company,
    option,
    coupons,
    couponsValue,
    doctorFees,
  ]);

  const handleCancel = useCallback(() => {
    if (activeStep === 1) {
      value.current = { ...value.current, discount, others };
      setActiveStep(0);
    }
  }, [activeStep, discount, others]);
  const okTitle = useMemo(
    () => (activeStep === 0 || activeStep === 1 ? 'Next' : 'Ok'),
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
      id: cS.id,
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
          <Steps.Item title="Doctor" onClick={() => setActiveStep(1)} />
          <Steps.Item title="Inventory" onClick={() => setActiveStep(2)} />
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
            cashPayment={cashPayment}
            onCashPaymentChange={setCashPayment}
            onOthersChange={setOthers}
            onOthersNameChange={setOthersName}
            onDiscountChange={setDiscount}
            appointment={appointment}
            option={option}
            setOption={setOption}
            sessions={updatedCompanySessions}
            organization={organization}
            patientCoupons={patientCoupons}
            handleOk={handleOk}
            onCancel={handleCancel}
            handleFinish={handleFinish}
            coupons={coupons}
            setCoupons={setCoupons}
            setCouponsValue={setCouponsValue}
            couponsValue={couponsValue}
            loading={loading}
            selectedSessions={selectedSessions}
            setSelectedSessions={setSelectedSessions}
          />
        )}
        {activeStep === 1 && (
          <DoctorsTab
            appointment={appointment}
            doctorFees={doctorFees}
            setDoctorFees={setDoctorFees}
          />
        )}
        {activeStep === 2 && (
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
