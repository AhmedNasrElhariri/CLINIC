import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Form, Divider } from 'rsuite';
import NumberFormat from 'react-number-format';
import * as R from 'ramda';

import { CRSelectInput, H6, CRButton, Div, H5 } from 'components';
import { CRNumberInput, CRTextInput } from 'components/widgets';
import ListInvoiceItems from '../list-invoice-items';

const OTHER = 'Other';

const initValue = {
  notes: '',
  price: 1,
};

function AppointmentInvoice({ clinic, onChange }) {
  const [session, setSession] = useState({});
  const [formValue, setFormValue] = useState(initValue);

  const [selectedSessions, setSelectedSessions] = useState([]);

  const sessions = useMemo(() => R.propOr([], 'sessions')(clinic), [clinic]);

  const choices = useMemo(() => {
    const { examinationPrice, followupPrice, urgentPrice } = R.pick([
      'examinationPrice',
      'followupPrice',
      'urgentPrice',
    ])(clinic || {});

    const allChoices = [
      ...sessions,
      { name: 'Examination', price: examinationPrice },
      { name: 'Followup', price: followupPrice },
      { name: 'Urgent', price: urgentPrice },
      { name: OTHER, price: 0 },
    ];
    return allChoices.map(s => ({ label: s.name, value: s }));
  }, [clinic, sessions]);

  const handleOnChange = useCallback(
    sessions => {
      setSelectedSessions(sessions);
      onChange(sessions);
      setSession({});
    },
    [onChange]
  );

  const add = useCallback(() => {
    if (!session) {
      return;
    }
    handleOnChange([...selectedSessions, session]);
  }, [handleOnChange, selectedSessions, session]);

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  const total = useMemo(
    () => selectedSessions.reduce((sum, { price }) => sum + price, 0),
    [selectedSessions]
  );

  const isOtherType = useMemo(() => session.name === OTHER, [session]);

  useEffect(() => {
    if (isOtherType) {
      setSession(value => ({ ...value, price: formValue.price }));
    }
  }, [formValue, isOtherType]);

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
      {isOtherType && (
        <Div mt={4}>
          <Form fluid formValue={formValue} onChange={setFormValue}>
            <CRTextInput label="Notes" name="notes" />
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
      <Div mt={5} display="flex" justifyContent="space-between">
        <H5 color="texts.1">Total</H5>
        <H5 color="texts.1">
          <NumberFormat value={total} displayType="text" thousandSeparator />
        </H5>
      </Div>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
  clinic: {},
};

export default AppointmentInvoice;
