import React, { useMemo, useState, useCallback } from 'react';
import { Form, Divider } from 'rsuite';
import NumberFormat from 'react-number-format';
import * as R from 'ramda';

import { CRSelectInput, H6, H7, CRButton, Div } from 'components';
import { CRNumberInput, CRTextInput } from 'components/widgets';
import ListInvoiceItems from '../list-invoice-items';
import PrintInvoice from '../print-invoice/index';

const OTHER = 'Other';

const initValue = {
  name: '',
  price: 1,
};

const Price = ({ name, price }) => (
  <Div display="flex" justifyContent="space-between" mb={1}>
    <H7 color="texts.1">{name}</H7>
    <H7 color="texts.1">
      <NumberFormat value={price} displayType="text" thousandSeparator />
    </H7>
  </Div>
);

const isOtherType = session => session.name === OTHER;

function AppointmentInvoice({
  onChange,
  discount,
  onDiscountChange,
  sessions,
}) {
  const [session, setSession] = useState({});
  const [formValue, setFormValue] = useState(initValue);

  const [selectedSessions, setSelectedSessions] = useState([]);

  const choices = useMemo(() => {
    const allChoices = [...sessions, { name: OTHER, price: 0 }];
    return allChoices.map(s => ({ label: s.name, value: s }));
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
      <Form fluid>
        <CRSelectInput
          label="Session Type"
          name="type"
          placeholder="Select Type"
          block
          cleanable={false}
          searchable={false}
          value={session}
          onChange={setSession}
          data={choices}
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
        Price:{' '}
        <NumberFormat
          value={session.price}
          displayType="text"
          thousandSeparator
        />
      </H6>
      <Div textAlign="right">
        <CRButton primary small onClick={add}>
          Add
        </CRButton>
      </Div>
      {selectedSessions.length > 0 && <Divider />}
      <Div my={3}>
        <ListInvoiceItems items={selectedSessions} onDelete={handleDelete} />
      </Div>
      <Divider />

      <Form>
        <CRNumberInput
          label="Discount"
          name="amount"
          value={discount}
          onChange={onDiscountChange}
        />
      </Form>
      <Divider />

      <Div>
        <Price name="Subtotal " price={subtotal} overriden />
        <Price name="Discount " price={discount} overriden />
        <Price name="Total" price={total} />
      </Div>

      <Div mt={3}>
        <PrintInvoice
          items={selectedSessions}
          subtotal={subtotal}
          total={total}
          discount={discount}
        />
      </Div>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
  clinic: {},
};

export default AppointmentInvoice;
