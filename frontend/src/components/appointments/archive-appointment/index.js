import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Steps, Schema } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { CRModal, Div } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import DoctorsTab from '../doctors-tab';
import { useForm, useCompanySessionDefinition, usePatients } from 'hooks';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';
import { useTranslation } from 'react-i18next';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});
const initValue = {
  sessions: [],
  items: [],
};
const initlOption = {
  option: '',
  amount: 0,
  payMethod: 'cash',
};
const initlDoctorOption = {
  option: 'fixed',
};
const initialDoctorFess = {
  doctorId: null,
  fees: 0,
  doctorName: '',
};
const initInventoryValue = {
  itemId: null,
  quantity: 1,
  branchId: null,
  specialtyId: null,
  userId: null,
};

const ArchiveAppointment = ({ appointment, show, onCancel, onOk, loading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [others, setOthers] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [othersName, setOthersName] = useState('');
  const [bank, setBank] = useState(null);
  const [cashPayment, setCashPayment] = useState(0);
  const [company, setCompany] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [couponsValue, setCouponsValue] = useState(0);
  const [option, setOption] = useState(initlOption);
  const [doctorOption, setDoctorOption] = useState(initlDoctorOption);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [doctorFees, setDoctorFees] = useState(initialDoctorFess);
  const [selectedItems, setSelectedItems] = useState([]);
  const [payOfRemaining, setPayOfRemaining] = useState(0);
  const value = useRef(initValue);
  const { t } = useTranslation();
  const { formValue, setFormValue } = useForm({
    initValue: initInventoryValue,
    model,
  });

  useEffect(() => {
    setOption(initlOption);
    setDiscount(0);
  }, [show]);

  const { patientCoupons, onePatient } = usePatients({
    patientId: appointment?.patient.id,
    all: false,
  });
  const totalRemainingOfPayment = onePatient?.remainingOfPayment;
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
  const subtotal = useMemo(() => {
    let sub = 0;
    const subRed = selectedSessions.reduce(
      (sum, { price, number }) => sum + number * price,
      0
    );
    sub = subRed + others;
    return sub;
  }, [selectedSessions, others]);
  const totalCoupons = useMemo(() => {
    let totalSum = 0;
    const values = Object.values(coupons);
    if (values.length === 0) {
      totalSum = 0;
    } else {
      values.forEach(v => {
        totalSum += v;
      });
    }
    return totalSum;
  }, [coupons]);
  const total = useMemo(
    () => subtotal - discount - totalCoupons - remaining + payOfRemaining,
    [discount, subtotal, totalCoupons, remaining, payOfRemaining]
  );
  const handleOk = useCallback(() => {
    if (activeStep !== 2) {
      setActiveStep(activeStep + 1);
    } else {
      let updatedDoctorfees = {};
      if (doctorOption.option === 'fixed') {
        updatedDoctorfees = doctorFees;
      } else {
        const updatedFees = 0.01 * doctorFees.fees * total;
        updatedDoctorfees = { ...doctorFees, fees: updatedFees };
      }
      onOk({
        ...value.current,
        discount,
        others,
        remaining,
        payOfRemaining,
        othersName,
        bank,
        company,
        option,
        coupons: newCoupons,
        couponsValue,
        doctorFees: updatedDoctorfees,
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
      setRemaining(0);
      setPayOfRemaining(0);
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
    remaining,
    payOfRemaining,
    bank,
    company,
    option,
    couponsValue,
    doctorFees,
    doctorOption,
    newCoupons,
    total,
  ]);
  const handleFinish = useCallback(() => {
    let updatedDoctorfees = {};
    if (doctorOption.option === 'fixed') {
      updatedDoctorfees = doctorFees;
    } else {
      const updatedFees = 0.01 * doctorFees.fees * total;
      updatedDoctorfees = { ...doctorFees, fees: updatedFees };
    }
    onOk({
      ...value.current,
      discount,
      others,
      remaining,
      othersName,
      payOfRemaining,
      bank,
      company,
      option,
      coupons: newCoupons,
      couponsValue,
      doctorFees: updatedDoctorfees,
    });
    setActiveStep(0);
    setOthers(0);
    setRemaining(0);
    setPayOfRemaining(0);
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
    remaining,
    payOfRemaining,
    othersName,
    bank,
    company,
    option,
    couponsValue,
    doctorFees,
    doctorOption,
    newCoupons,
    total,
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
    [company, companysSessionDefinition]
  );
  const updatedCompanySessions = companySessions.map(cS => {
    return {
      name: cS.name,
      price: cS.price,
      id: cS.id,
    };
  });

  const stepItems = useMemo(
    () =>
      [t('invoice'), t('doctor'), t('inventory')].map((title, idx) => (
        <Steps.Item title={title} onClick={() => setActiveStep(idx)} />
      )),
    [setActiveStep, t]
  );

  return (
    <CRModal
      show={show}
      header={t('archiveAppointment')}
      okTitle={okTitle}
      z
      onOk={handleOk}
      loading={loading}
      onHide={() => {
        onCancel();
        setActiveStep(0);
      }}
      onCancel={handleCancel}
      className="!w-[1024px]"
    >
      <div className="max-w-lg mx-auto mb-7">
        <Steps current={activeStep} className="![display:none] sm:!flex">
          {stepItems}
        </Steps>

        <Steps current={activeStep} vertical className="sm:hidden">
          {stepItems}
        </Steps>
      </div>

      <Div>
        {activeStep === 0 && (
          <AppointmentInvoice
            onChange={handleInvoiceChange}
            discount={discount}
            remaining={remaining}
            others={others}
            othersName={othersName}
            bank={bank}
            setBank={setBank}
            company={company}
            setCompany={setCompany}
            cashPayment={cashPayment}
            onCashPaymentChange={setCashPayment}
            onOthersChange={setOthers}
            onRemainingChange={setRemaining}
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
            subtotal={subtotal}
            totalCoupons={totalCoupons}
            total={total}
            payOfRemaining={payOfRemaining}
            setPayOfRemaining={setPayOfRemaining}
            totalRemainingOfPayment={totalRemainingOfPayment}
          />
        )}
        {activeStep === 1 && (
          <DoctorsTab
            appointment={appointment}
            doctorFees={doctorFees}
            setDoctorFees={setDoctorFees}
            doctorOption={doctorOption}
            setDoctorOption={setDoctorOption}
          />
        )}
        {activeStep === 2 && (
          <InventoryUsage
            onChange={handleInventoryChange}
            handleCancel={handleCancel}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            formValue={formValue}
            setFormValue={setFormValue}
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
