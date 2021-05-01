import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Form, DatePicker } from 'rsuite';
import { H3, Div, CRButton, CRNumberInput, CRDatePicker } from 'components';
import SessionDefinitions from '../session-definations';
import EnableInvoiceCounter from './enable-invoice-counter/index';
import { useConfigurations } from 'hooks';

const initialValues = {
  sessions: [],
  enableInvoiceCounter: false,
};
const initialPulsesValue = {
  before: 0,
  after: 0,
  date: new Date(),
};

const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const [pulsesValue, setPulseValues] = useState(initialPulsesValue);
  const {
    configurations,
    update,
    addPulsesControl,
    mutationData,
  } = useConfigurations({});
  useEffect(() => {
    const sessions = R.pipe(
      R.propOr([], 'sessions'),
      R.map(R.pick(['name', 'price']))
    )(configurations);
    const enableInvoiceCounter = R.propOr(
      false,
      'enableInvoiceCounter'
    )(configurations);
    setFormValue({
      sessions,
      enableInvoiceCounter,
    });
  }, [configurations]);
  const handleSave = useCallback(() => {
    update(formValue);
  }, [formValue, update]);

  const sessions = useMemo(() => R.propOr([], 'sessions')(formValue), [
    formValue,
  ]);

  const updateSession = useCallback(
    session => {
      setFormValue({
        ...formValue,
        sessions: [...sessions, session],
      });
    },
    [formValue, sessions]
  );

  const updateEnable = useCallback(
    enable => {
      setFormValue({
        ...formValue,
        enableInvoiceCounter: enable,
      });
    },
    [formValue]
  );
  const handlePulsesSave = useCallback(() => {
    addPulsesControl({
      variables: {
        pulsesControl: pulsesValue,
      },
    });
  }, [pulsesValue, addPulsesControl]);

  const handleDelete = useCallback(
    idx => {
      setFormValue({
        ...formValue,
        sessions: R.remove(idx, 1)(sessions),
      });
    },
    [formValue, sessions]
  );

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Configurations</H3>
        <Div>
          <CRButton onClick={handleSave} variant="primary">
            Save
          </CRButton>
        </Div>
      </Div>
      <SessionDefinitions
        sessions={sessions}
        onChange={updateSession}
        onDelete={handleDelete}
      />
      <EnableInvoiceCounter
        onChange={updateEnable}
        value={formValue.enableInvoiceCounter}
      />
      <hr></hr>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Pulses Control</H3>
        <Div>
          <CRButton onClick={handlePulsesSave} variant="primary">
            Save
          </CRButton>
        </Div>
      </Div>
      <Form formValue={pulsesValue} onChange={setPulseValues}>
        <Div display="flex" justifyContent="space-between">
          <CRNumberInput
            name="before"
            label="before"
            layout="inline"
            placeholder="Pulses"
          />
          <CRNumberInput
            name="after"
            label="after"
            layout="inline"
            placeholder="Pulses"
          />
          <CRDatePicker
            block
            name="date"
            accepter={DatePicker}
            placement="top"
          />
        </Div>
      </Form>
    </>
  );
};

export default Configurations;
