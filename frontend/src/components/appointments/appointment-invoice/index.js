import React, { useMemo, useState, useCallback } from 'react';
import { Form } from 'rsuite';
import NumberFormat from 'react-number-format';
import * as R from 'ramda';
import {
  CRSelectInput,
  H5,
  H6,
  Div,
  CRButton,
  CRNumberInput,
  CRTextInput,
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
  sessions,
  company,
  setCompany,
  price: appointmentPrice,
  setPrice,
  option,
  setOption,
  bank,
  setBank,
  organization,
}) {
  const [session, setSession] = useState({});
  const { prices } = usePrice({});
  const [sessionNumber, setSessionNumber] = useState(0);
  const [visa, setVisa] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [formValue, setFormValue] = useState(initValue);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const { banksDefinition } = useBankDefinition({});
  const { companysDefinition } = useCompanyDefinition({});
  const { sessionsDefinition } = useSessionDefinition({});
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
    sub = subRed + others + (appointmentPrice?.price || 0);
    return sub;
  }, [selectedSessions, option, appointmentPrice, others]);
  const total = useMemo(() => subtotal - discount, [discount, subtotal]);

  return (
    <>
      <Div mt={20}>
        <Div display="flex">
          <CRButton
            onClick={() => {
              setVisa(true);
              setInsurance(false);
            }}
            mr={10}
          >
            Pay By Visa
          </CRButton>
          <CRButton
            onClick={() => {
              setInsurance(true);
              setVisa(false);
            }}
            mr={10}
          >
            Insurance Pay
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
          <Form>
            <Div mb={10}>
              <CRDocSelectInput
                onChange={val => val == null ? setPrice({}) : setPrice(val) }
                label="Appointment Price"
                data={prices}
                style={{ width: '400px' }}
              />
            </Div>
          </Form>
          <Form fluid>
            <CRButton onClick={() => add()}>add</CRButton>
            <Div display="flex" justifyContent="space-around">
              {company == null ? (
                <CRDocSelectInput
                  onChange={val => val == null ? setSession({}) : setSession(val) }
                  value={session}
                  label="session Type"
                  data={sessionsDefinition}
                  style={{ width: '230px' }}
                />
              ) : (
                <CRSelectInput
                  label="Session Type"
                  placeholder="Select Type"
                  value={session}
                  onChange={val => val == null ? setSession({}) : setSession(val) }
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
          {company !== null && (
            <>
              <Form formValue={option} onChange={setOption}>
                <CRRadio options={payOptions} name="option" />
                {option.option === 'fixed' && company !== null ? (
                  <CRNumberInput label="Fixed Payment" name="amount" />
                ) : (
                  option.option === 'percentage' &&
                  company !== null && (
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
          <H5 fontWeight={400}>Session Summary</H5>
          <Div background="#f0f1f1" p="6px 8px">
            <Price name="Others" price={others} overriden variant="primary" />
            <Price name="Subtotal " price={subtotal} overriden />
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
      <PrintInvoice
        items={selectedSessions}
        subtotal={subtotal}
        total={total}
        patientName={appointment?.patient.name}
        appointmentPrice={appointmentPrice}
        others={others}
        option={option}
        othersName={othersName}
        discount={discount}
        organization={organization}
      />
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
};

export default AppointmentInvoice;
