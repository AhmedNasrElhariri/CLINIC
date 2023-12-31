import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Steps, Schema } from 'rsuite';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { CRModal, Div } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import CostTab from '../cost-tab';
import { useForm, useCompanySessionDefinition, usePatients } from 'hooks';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';
import { useTranslation } from 'react-i18next';
import ReferedDoctorInvoice from '../refered-doctor-invoice';
import { getName } from 'services/accounting';
import {
  initValue,
  initlOption,
  // initialDoctorFess,
  initInventoryValue,
  companyInital,
} from './constants';
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});

const ArchiveAppointment = ({
  appointment,
  show,
  onCancel,
  onOk,
  loading,
  archiveReferedDoctorAppointment,
  company,
  setCompany,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [others, setOthers] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [othersName, setOthersName] = useState('');
  const [bank, setBank] = useState(null);
  const [cashPayment, setCashPayment] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [couponsValue, setCouponsValue] = useState(0);
  const [option, setOption] = useState(initlOption);
  const [selectedSessions, setSelectedSessions] = useState([]);
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

  useEffect(() => {
    setCompany(company => ({
      ...company,
      cardId: onePatient.cardId || '',
      cardExpiryDate: onePatient.cardExpiryDate || null,
    }));
  }, [onePatient.id]);

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
    // if (activeStep !== 2) {
    //   setActiveStep(activeStep + 1);
    // } else {
    if (appointment?.referedDoctor) {
      archiveReferedDoctorAppointment({
        variables: {
          data: {
            sessions: selectedSessions.map(session => ({
              name: getName({ session, appointment }),
              price: session.price,
              number: session.number,
              id: session.id,
              patientFees: session?.patientFees || 0,
              feesCalType: session?.type,
              cost: session?.cost,
            })),
            appointmentId: appointment?.id,
            doctorId: appointment?.doctor.id,
            specialtyId: appointment?.specialty.id,
            branchId: appointment?.branch.id,
          },
        },
      });
    } else {
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
      });
      setOthers(0);
      setBank(null);
      // setCompany(companyInital);
      setOthersName('');
      setDiscount(0);
      setCoupons([]);
      setCouponsValue(0);
      setSelectedSessions([]);
      setRemaining(0);
      setPayOfRemaining(0);
      value.current = {
        sessions: [],
        items: [],
      };
    }
  }, [
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
    newCoupons,
    selectedSessions,
    appointment,
    archiveReferedDoctorAppointment,
    // cardInfo,
  ]);
  const handleFinish = useCallback(() => {
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
    });
    setOthers(0);
    setRemaining(0);
    setPayOfRemaining(0);
    setBank(null);
    // setCompany(companyInital);
    setOthersName('');
    setDiscount(0);
    setCoupons([]);
    setCouponsValue(0);
    setSelectedSessions([]);
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
    newCoupons,
  ]);

  const handleFinishReferedDoctor = useCallback(() => {
    archiveReferedDoctorAppointment({
      variables: {
        data: {
          sessions: selectedSessions.map(session => ({
            name: getName({ session, appointment }),
            price: session.price,
            number: session.number,
            id: session.id,
            patientFees: session?.patientFees || 0,
            feesCalType: session?.type,
            cost: session?.cost,
          })),
          appointmentId: appointment?.id,
          doctorId: appointment?.doctor.id,
          specialtyId: appointment?.specialty.id,
          branchId: appointment?.branch.id,
        },
      },
    });
  }, [selectedSessions, appointment, archiveReferedDoctorAppointment]);

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
    () =>
      companysSessionDefinition.filter(
        s => s.company.id === company?.companyId
      ),
    [company, companysSessionDefinition]
  );
  const updatedCompanySessions = companySessions.map(
    ({ name, price, id, company }) => {
      return {
        name,
        price,
        id,
        companyId: company?.id,
      };
    }
  );
  const stepItems = useMemo(
    () =>
      [t('invoice'), t('cost'), t('inventory')].map((title, idx) => (
        <Steps.Item title={title} onClick={() => setActiveStep(idx)} />
      )),
    [setActiveStep, t]
  );

  return (
    <CRModal
      show={show}
      header={t('archiveAppointment')}
      okTitle={okTitle}
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
        {activeStep === 0 && !appointment?.referedDoctor && (
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
        {activeStep === 0 && appointment?.referedDoctor && (
          <ReferedDoctorInvoice
            handleFinishReferedDoctor={handleFinishReferedDoctor}
            selectedSessions={selectedSessions}
            setSelectedSessions={setSelectedSessions}
            appointment={appointment}
          />
        )}
        {activeStep === 1 && (
          <CostTab
            onChange={handleInvoiceChange}
            selectedSessions={selectedSessions}
            setSelectedSessions={setSelectedSessions}
            handleFinish={handleFinish}
            loading={loading}
            refered={appointment?.referedDoctor}
            t={t}
            handleFinishReferedDoctor={handleFinishReferedDoctor}
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
