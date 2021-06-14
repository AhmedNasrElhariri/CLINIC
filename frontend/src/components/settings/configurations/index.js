import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import * as moment from 'moment';
import { Form } from 'rsuite';
import { H3, Div, CRButton, CRNumberInput } from 'components';
import SessionDefinitions from '../session-definations';
import EnableInvoiceCounter from './enable-invoice-counter/index';
import { useAuth, useConfigurations } from 'hooks';
import { get } from './../../../services/local-storage';
import { POSITIONS } from 'utils/constants';
const initialValues = {
  sessions: [],
  enableInvoiceCounter: false,
};
const initialPulsesValue = {
  before: 0,
  after: 0,
};

const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const [pulsesValue, setPulseValues] = useState(initialPulsesValue);
  const { isOrAssistant } = useAuth();
  const { configurations, update, addPulsesControl, getPulseControl } =
    useConfigurations();
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
    const before = R.propOr(0, 'before')(getPulseControl);
    const after = R.propOr(0, 'after')(getPulseControl);
    setPulseValues({ ...pulsesValue, before, after });
  }, [configurations, getPulseControl]);
  const handleSave = useCallback(() => {
    update(formValue);
  }, [formValue, update]);

  const sessions = useMemo(
    () => R.propOr([], 'sessions')(formValue),
    [formValue]
  );

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
  const today = moment(new Date()).format('DD/MM/YYYY');
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
        value={formValue?.enableInvoiceCounter}
      />
      {isOrAssistant && (
        <>
          <hr></hr>
          <Div display="flex" justifyContent="space-between">
            <Div display="flex" justifyContent="space-around">
              <H3 mb={64} mr={20}>
                Pulses Control
              </H3>
              <H3>{today}</H3>
            </Div>
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
                disabled
                placeholder="Pulses"
              />
              <CRNumberInput
                name="after"
                label="after"
                layout="inline"
                placeholder="Pulses"
              />
            </Div>
          </Form>
        </>
      )}
    </>
  );
};

export default Configurations;
