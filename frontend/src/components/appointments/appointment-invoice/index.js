import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Form, CheckboxGroup, Checkbox } from 'rsuite';
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
  CRCheckBoxGroup,
  H3,
  H4,
} from 'components';
import ListInvoiceItems from '../list-invoice-items';
import PrintInvoice from '../print-invoice/index';
import { CRDivider } from 'components';
import {
  useBankDefinition,
  useCompanyDefinition,
  usePrice,
  useSessionDefinition,
} from 'hooks';
import { CRRadio, CRDocSelectInput } from 'components/widgets';

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
  appointment,
  others,
  onOthersChange,
  othersName,
  onOthersNameChange,
  onDiscountChange,
  cashPayment,
  onCashPaymentChange,
  sessions,
  company,
  setCompany,
  option,
  setOption,
  patientCoupons,
  handleOk,
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
  setSelectedSessions
}) {
  const [session, setSession] = useState({});
  const [sessionNumber, setSessionNumber] = useState(0);
  const [visa, setVisa] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [formValue, setFormValue] = useState(initValue);
  const { banksDefinition } = useBankDefinition({});
  const { companysDefinition } = useCompanyDefinition({});
  const { sessionsDefinition } = useSessionDefinition({});
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
  const subtotal = useMemo(() => {
    let sub = 0;
    const subRed = selectedSessions.reduce(
      (sum, { price, number }) => sum + number * price,
      0
    );
    sub = subRed + others;
    return sub;
  }, [selectedSessions, option, others]);
  const totalCoupons = useMemo(() => {
    let totalSum = 0;
    const values = Object.values(coupons);
    if (values.length == 0) {
      totalSum = 0;
    } else {
      values.forEach(v => {
        totalSum += v;
      });
    }
    return totalSum;
  }, [coupons]);
  const total = useMemo(
    () => subtotal - discount - totalCoupons,
    [discount, subtotal, totalCoupons]
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
            }}
            mr={10}
          >
            Pay By Visa
          </CRButton>
          <CRButton
            onClick={() => {
              setInsurance(true);
              setVisa(false);
              setCoupon(false);
            }}
            mr={10}
          >
            Insurance Pay
          </CRButton>
          <CRButton
            onClick={() => {
              setInsurance(false);
              setVisa(false);
              setCoupon(true);
            }}
            mr={10}
          >
            Coupon Pay
          </CRButton>
        </Div>
        {visa && (
          <Form>
            <CRSelectInput
              label="Bank Name"
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
              Points: {appointment?.patient.points}
            </Div>
            {patientCoupons.length == 0 && (
              <Div mt={20} color="bold">
                No Coupons Exists
              </Div>
            )}
            {/* <Form>
              <CheckboxGroup
                value={coupons}
                onChange={value => {
                  setCoupons(value);
                }}
              >
                {patientCoupons.map(c => (
                  <Checkbox value={c.id}>Coupon -- {c.value}</Checkbox>
                ))}
              </CheckboxGroup>
            </Form> */}
            <Form onChange={setCoupons} formValue={coupons}>
              {patientCoupons.map((c, index) => (
                <Div display="flex" key={c.id}>
                  <Div mt={17} width={150}>
                    Coupon -- {c.value}
                  </Div>
                  <Div mt={17} width={150}>
                    Remaining --{c.remaining}{' '}
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
              label="Compance Name"
              name="bank"
              data={companysDefinition}
              value={company}
              onChange={setCompany}
              placeholder="Select One Company"
              style={{ width: '230px' }}
            />
          </Form>
        )}
      </Div>
      <Div display="flex" mt={40}>
        <Div width={500} mr={20}>
          <Form fluid>
            <CRButton onClick={() => add()}>add</CRButton>
            <Div display="flex" justifyContent="space-around">
              {company == null ? (
                <CRSelectInput
                  onChange={val =>
                    val == null ? setSession({}) : setSession(val)
                  }
                  value={session}
                  label="session Type"
                  data={updatedSessionDefinitions}
                  style={{ width: '230px' }}
                />
              ) : (
                <CRSelectInput
                  label="Session Type"
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
                label="Number of Sessions"
                name="sessionsNumber"
                value={sessionNumber}
                onChange={setSessionNumber}
              ></CRNumberInput>
            </Div>
          </Form>
          {isOtherType(session) && (
            <Div mt={4}>
              <Form fluid formValue={formValue} onChange={setFormValue}>
                <CRTextInput label="Name" name="name" />
                <CRNumberInput label="Price" name="price" />
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
                label="Discount"
                name="amount"
                value={discount}
                onChange={val => onDiscountChange(Number(val))}
                width={210}
                addOn={<CRButton variant="danger">Applied</CRButton>}
              />
              <Div display="flex">
                <CRTextInput
                  label="Others"
                  name="others"
                  value={others}
                  onChange={val => onOthersChange(Number(val))}
                />
                <CRTextInput
                  label="Others Name"
                  name="othersName"
                  value={othersName}
                  onChange={val => onOthersNameChange(val)}
                />
              </Div>
            </Form>
          </Div>
          <CRDivider />
          {(company !== null || bank !== null) && (
            <>
              <Form formValue={option} onChange={setOption}>
                <CRRadio options={payOptions} name="option" />
                {(option.option === 'fixed' && company !== null) ||
                bank !== null ? (
                  <CRNumberInput label="Fixed Payment" name="amount" />
                ) : (
                  option.option === 'percentage' &&
                  (company !== null || bank !== null) && (
                    <CRNumberInput
                      label="Percentage from 0 : 100"
                      name="price"
                      name="amount"
                    />
                  )
                )}
              </Form>
              <CRDivider />
            </>
          )}
          {/* {bank !== null && (
            <>
              <Form fluid>
                <CRNumberInput
                  label="Cash Payment Part"
                  name="cashPayment"
                  value={cashPayment}
                  onChange={val => onCashPaymentChange(val)}
                />
              </Form>
              <CRDivider />
            </>
          )} */}
          <H5 fontWeight={400}>Session Summary</H5>
          <Div background="#f0f1f1" p="6px 8px">
            <Price name="Others" price={others} overriden variant="primary" />
            <Price name="Subtotal " price={subtotal} overriden />
            {couponsValue > 0 && (
              <Price
                name="Coupon Values"
                price={couponsValue}
                overriden
                variant="danger"
              />
            )}
            <Price
              name="Discount"
              price={discount}
              overriden
              variant="danger"
            />
          </Div>
          <CRDivider />
          <Div pr="8px">
            <Price name="Total" price={total} />
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
          option={option}
          othersName={othersName}
          discount={discount}
          organization={organization}
          couponsValue={couponsValue}
        />
        <CRButton onClick={handleFinish}>
          {loading ? <Spinner /> : 'Finish'}
        </CRButton>
      </Div>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
};

export default AppointmentInvoice;
