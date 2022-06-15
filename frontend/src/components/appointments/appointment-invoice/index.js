import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Form } from 'rsuite';
import NumberFormat from 'react-number-format';
import { Spinner } from 'components/widgets/button/spinner';
import * as R from 'ramda';
import {
  CRSelectInput,
  H5,
  H6,
  Div,
  CRButton,
  CRNumberInput,
  CRTextInput,
  CRRadio,
} from 'components';
import ListInvoiceItems from '../list-invoice-items';
import PrintInvoice from '../print-invoice/index';
import { CRDivider } from 'components';
import {
  useBankDefinition,
  useCompanyDefinition,
  useSessionDefinition,
} from 'hooks';
import { useTranslation } from 'react-i18next';

const OTHER = 'Other';

const initValue = {
  name: '',
  price: 1,
};
const initialCouponObject = {
  id: null,
  val: 0,
};
const checkCouponExists = (id, coupons) => {
  if (coupons.length == 0) {
    return -1;
  } else {
    const exist = coupon => coupon.id === id;
    const existValue = coupons.findIndex(exist);
    return existValue;
  }
};

const Price = ({ name, price, variant }) => (
  <Div display="flex" justifyContent="space-between" mb={1}>
    <H5 variant={variant} weight="semiBold">
      {name}
    </H5>
    <H5 variant={variant} weight="semiBold">
      EGP <NumberFormat value={price} displayType="text" thousandSeparator />
    </H5>
  </Div>
);

const isOtherType = session => session.name === OTHER;
const payOptions = [
  { name: 'Fixed', value: 'fixed' },
  { name: 'Percentage', value: 'percentage' },
];
const payMethods = [
  { name: 'Visa', value: 'visa' },
  { name: 'Cash', value: 'cash' },
];
function AppointmentInvoice({
  onChange,
  discount,
  remaining,
  appointment,
  others,
  onOthersChange,
  onRemainingChange,
  othersName,
  onOthersNameChange,
  onDiscountChange,
  sessions,
  company,
  setCompany,
  option,
  setOption,
  patientCoupons,
  bank,
  setBank,
  organization,
  handleFinish,
  coupons,
  setCoupons,
  setCouponsValue,
  couponsValue,
  loading,
  selectedSessions,
  setSelectedSessions,
  subtotal,
  totalCoupons,
  total,
  payOfRemaining,
  setPayOfRemaining,
  totalRemainingOfPayment,
}) {
  const [session, setSession] = useState({});
  const [sessionNumber, setSessionNumber] = useState(1);
  const [visa, setVisa] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [remainingOperation, setRemainingOperation] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [formValue, setFormValue] = useState(initValue);
  const { banksDefinition } = useBankDefinition({});
  const { companysDefinition } = useCompanyDefinition({});
  const { sessionsDefinition } = useSessionDefinition({});
  const { t } = useTranslation();
  const updatedSessionDefinitions = sessionsDefinition.map(s => {
    return {
      name: s.name,
      id: s,
    };
  });
  const choices = useMemo(() => {
    const allChoices = [...sessions];
    return allChoices.map(s => ({ name: s.name, id: s }));
  }, [sessions]);
  const handleOnChange = useCallback(
    sessions => {
      setSelectedSessions(sessions);
      onChange(sessions);
      setFormValue(initValue);
      setSession({});
    },
    [onChange]
  );
  const add = useCallback(() => {
    if (R.isNil(session) || R.isEmpty(session)) {
      return;
    }
    const updatedSession = { ...session, number: sessionNumber };
    const sessionData = isOtherType(session)
      ? { ...formValue }
      : updatedSession;
    handleOnChange([...selectedSessions, sessionData]);
  }, [formValue, handleOnChange, sessionNumber, selectedSessions, session]);
  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  useEffect(() => {
    setCouponsValue(totalCoupons);
  }, [setCouponsValue, totalCoupons]);
  return (
    <>
      <Div mt={20}>
        <Div display="flex">
          <CRButton
            onClick={() => {
              setVisa(true);
              setInsurance(false);
              setCoupon(false);
              setRemainingOperation(false);
            }}
            mr={10}
          >
            {t('payByVisa')}
          </CRButton>
          <CRButton
            onClick={() => {
              setInsurance(true);
              setVisa(false);
              setCoupon(false);
              setRemainingOperation(false);
            }}
            mr={10}
          >
            {t('insurancePay')}
          </CRButton>
          <CRButton
            onClick={() => {
              setInsurance(false);
              setVisa(false);
              setCoupon(true);
              setRemainingOperation(false);
            }}
            mr={10}
          >
            {t('couponPay')}
          </CRButton>
          <CRButton
            onClick={() => {
              setInsurance(false);
              setVisa(false);
              setCoupon(false);
              setRemainingOperation(true);
            }}
            mr={10}
          >
            {t('remainingPay')}
          </CRButton>
        </Div>
        {visa && (
          <Form>
            <CRSelectInput
              label={t('bank')}
              name="bank"
              data={banksDefinition}
              value={bank}
              onChange={setBank}
              placeholder="Select One Bank "
              style={{ width: '230px' }}
            />
          </Form>
        )}
        {coupon && (
          <>
            <Div mt={20} color="bold">
              {t('points')}: {appointment?.patient.points}
            </Div>
            {patientCoupons.length == 0 && (
              <Div mt={20} color="bold">
                {t('noCouponsExists')}
              </Div>
            )}
            <Form onChange={setCoupons} formValue={coupons}>
              {patientCoupons.map((c, index) => (
                <Div display="flex" key={c.id}>
                  <Div mt={17} width={150}>
                    {t('coupon')} -- {c.value}
                  </Div>
                  <Div mt={17} width={150}>
                    {t('remaining')} --{c.remaining}{' '}
                  </Div>
                  <Div width={150}>
                    <CRNumberInput
                      name={c.id}
                      min={0}
                      max={c.remaining}
                      value={coupons[c.id] ? coupons[c.id] : 0}
                    />
                  </Div>
                </Div>
              ))}
            </Form>
          </>
        )}
        {insurance && (
          <Form>
            <CRSelectInput
              label={t('company')}
              name="bank"
              data={companysDefinition}
              value={company}
              onChange={setCompany}
              placeholder="Select One Company"
              style={{ width: '230px' }}
            />
          </Form>
        )}
        {remainingOperation && (
          <>
            <Div m="10px 0px">
              {t('theRemaining')} : {totalRemainingOfPayment}
            </Div>
            <Form>
              <CRNumberInput
                label={t('payOfRemaining')}
                name="payOfRemaining"
                value={payOfRemaining}
                onChange={setPayOfRemaining}
                style={{ width: '230px' }}
              />
            </Form>
          </>
        )}
      </Div>
      <Div display="flex" mt={40}>
        <Div width={500} mr={20}>
          <Form fluid>
            <CRButton onClick={() => add()}>{t('add')}</CRButton>
            <Div display="flex" justifyContent="space-around">
              {company == null ? (
                <CRSelectInput
                  onChange={val =>
                    val == null ? setSession({}) : setSession(val)
                  }
                  value={session}
                  label={t('session')}
                  data={updatedSessionDefinitions}
                  style={{ width: '230px' }}
                />
              ) : (
                <CRSelectInput
                  label={t('session')}
                  placeholder="Select Type"
                  value={session}
                  onChange={val =>
                    val == null ? setSession({}) : setSession(val)
                  }
                  data={choices}
                  style={{ width: '230px' }}
                />
              )}
              <CRNumberInput
                label={t('numberOfSessions')}
                name="sessionsNumber"
                value={sessionNumber}
                onChange={setSessionNumber}
              ></CRNumberInput>
            </Div>
          </Form>
          {isOtherType(session) && (
            <Div mt={4}>
              <Form fluid formValue={formValue} onChange={setFormValue}>
                <CRTextInput label={t('name')} name="name" />
                <CRNumberInput label={t('price')} name="price" />
              </Form>
            </Div>
          )}
          <H6 mt={2} color="texts.2">
            <NumberFormat
              value={session.price}
              displayType="text"
              thousandSeparator
            />
          </H6>
          <Div my={3}>
            <ListInvoiceItems
              items={selectedSessions}
              onDelete={handleDelete}
            />
          </Div>
        </Div>
        <Div>
          <Div mb={4}>
            <Form>
              <CRTextInput
                label={t('discount')}
                name="amount"
                value={discount}
                onChange={val => onDiscountChange(Number(val))}
                width={210}
                addOn={<CRButton variant="danger">{t('applied')}</CRButton>}
              />
              <Div display="flex">
                <CRTextInput
                  label={t('others')}
                  name="others"
                  value={others}
                  onChange={val => onOthersChange(Number(val))}
                />
                <CRTextInput
                  label={t('name')}
                  name="othersName"
                  value={othersName}
                  onChange={val => onOthersNameChange(val)}
                />
              </Div>
              <CRTextInput
                label={t('remaining')}
                name="remaining"
                value={remaining}
                onChange={val => onRemainingChange(Number(val))}
                width={210}
              />
            </Form>
          </Div>
          <CRDivider />
          {(company !== null || bank !== null) && (
            <>
              <Form formValue={option} onChange={setOption}>
                <CRRadio options={payOptions} name="option" />
                {(option.option === 'fixed' && company !== null) ||
                bank !== null ? (
                  <CRNumberInput label={t('cashPayment')} name="amount" />
                ) : (
                  option.option === 'percentage' &&
                  (company !== null || bank !== null) && (
                    <CRNumberInput
                      label={t('percentagefrom0To100')}
                      name="price"
                      name="amount"
                    />
                  )
                )}
              </Form>
              <CRDivider />
            </>
          )}
          <H5 fontWeight={400}>{t('summary')}</H5>
          <Div background="#f0f1f1" p="6px 8px">
            {others > 0 && (
              <Price
                name={t('others')}
                price={others}
                overriden
                variant="primary"
              />
            )}
            {payOfRemaining > 0 && (
              <Price
                name={t('thePayOfTheRemaining')}
                price={payOfRemaining}
                overriden
                variant="primary"
              />
            )}
            <Price name={t('subtotal')} price={subtotal} overriden />
            {couponsValue > 0 && (
              <Price
                name={t('couponValue')}
                price={couponsValue}
                overriden
                variant="danger"
              />
            )}
            {discount > 0 && (
              <Price
                name={t('discount')}
                price={discount}
                overriden
                variant="danger"
              />
            )}

            {remaining > 0 && (
              <Price
                name={t('remaining')}
                price={remaining}
                overriden
                variant="danger"
              />
            )}
          </Div>
          <CRDivider />
          <Div pr="8px">
            <Price name={t('total')} price={total} />
          </Div>
        </Div>
      </Div>
      <Div display="flex">
        <PrintInvoice
          items={selectedSessions}
          subtotal={subtotal}
          total={total}
          patientName={appointment?.patient.name}
          others={others}
          remaining={remaining}
          payOfRemaining={payOfRemaining}
          option={option}
          othersName={othersName}
          discount={discount}
          organization={organization}
          couponsValue={couponsValue}
          printName={t('print')}
        />
        <CRButton onClick={handleFinish}>
          {loading ? <Spinner /> : t('finish')}
        </CRButton>
      </Div>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
};

export default AppointmentInvoice;
