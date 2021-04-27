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

function AppointmentInvoice({
  onChange,
  discount,
  onDiscountChange,
  sessions,
  organization,
}) {
  const [session, setSession] = useState({});
  const [formValue, setFormValue] = useState(initValue);

  const [selectedSessions, setSelectedSessions] = useState([]);

  const choices = useMemo(() => {
    const allChoices = [...sessions, { name: OTHER, price: 0 }];
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
    const sessionData = isOtherType(session) ? { ...formValue } : session;
    handleOnChange([...selectedSessions, sessionData]);
  }, [formValue, handleOnChange, selectedSessions, session]);

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  const subtotal = useMemo(
    () => selectedSessions.reduce((sum, { price }) => sum + price, 0),
    [selectedSessions]
  );

  const total = useMemo(() => subtotal - discount, [discount, subtotal]);

  return (
    <>
      <Div display="flex" mt={40}>
        <Div width={500} mr={50}>
          <Form fluid>
            <CRSelectInput
              label="Session Type"
              name="type"
              placeholder="Select Type"
              block
              value={session}
              onChange={setSession}
              data={choices}
              onSelect={add()}
            />
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
                onChange={onDiscountChange}
                width={210}
                addOn={<CRButton variant="danger">Applied</CRButton>}
              />
            </Form>
          </Div>
          <H5 fontWeight={400}>Session Summary</H5>
          <Div background="#f0f1f1" p="6px 8px">
            <Price name="Subtotal " price={subtotal} overriden />
            <Price
              name="Discount "
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
