import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import * as moment from 'moment';
import { Form } from 'rsuite';
import { H3, Div, CRButton, CRNumberInput } from 'components';
import EnableInvoiceCounter from './enable-invoice-counter/index';
import { useConfigurations } from 'hooks';

const initialValues = {
  sessions: [],
  enableInvoiceCounter: false,
};
const initialPulsesValue = {
  before: 0,
  after: 0,
};
const initialPageSetup = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  type: 'Letter',
};
const pageSizeTypes = [
  { id: 'Letter', name: 'Letter' },
  { id: 'Tabloid', name: 'Tabloid' },
  { id: 'Legal', name: 'Legal' },
  { id: 'Statement', name: 'Statement' },
  { id: 'Executive', name: 'Executive' },
  { id: 'A3', name: 'A3' },
  { id: 'A4', name: 'A4' },
  { id: 'A5', name: 'A5' },
  { id: 'B4(JIS)', name: 'B4(JIS)' },
  { id: 'B5(JIS)', name: 'B5(JIS)' },
];

const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const [pulsesValue, setPulseValues] = useState(initialPulsesValue);
  const [pageSetup, setPageSetup] = useState(initialPageSetup);
  const {
    configurations,
    update,
    addPulsesControl,
    getPulseControl,
    addPageSetup,
    pageSetupData,
  } = useConfigurations();
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
  useEffect(() => {
    const top = R.propOr(0, 'top')(pageSetupData);
    const right = R.propOr(0, 'right')(pageSetupData);
    const bottom = R.propOr(0, 'bottom')(pageSetupData);
    const left = R.propOr(0, 'left')(pageSetupData);
    const type = R.propOr('', 'type')(pageSetupData);
    setPageSetup({ ...pageSetup, top, right, bottom, left, type });
  }, [pageSetupData]);
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
  const handlePageSetupSave = useCallback(() => {
    addPageSetup({
      variables: {
        pageSetup: pageSetup,
      },
    });
  }, [pageSetup, addPageSetup]);

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
      {/* <SessionDefinitions
        sessions={sessions}
        onChange={updateSession}
        onDelete={handleDelete}
      /> */}
      <EnableInvoiceCounter
        onChange={updateEnable}
        value={formValue?.enableInvoiceCounter}
      />
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

      <>
        <hr></hr>
        <Div display="flex" justifyContent="space-between">
          <Div display="flex" justifyContent="space-around">
            <H3 mb={64} mr={20}>
              Page Setup Control (By Centimeter)
            </H3>
          </Div>
          <Div>
            <CRButton onClick={handlePageSetupSave} variant="primary">
              Save
            </CRButton>
          </Div>
        </Div>
        <Form formValue={pageSetup} onChange={setPageSetup}>
          <Div display="flex" justifyContent="space-between">
            <CRNumberInput
              name="top"
              label="Top"
              layout="inline"
              placeholder="By Centimeter"
            />
            <CRNumberInput
              name="right"
              label="Right"
              layout="inline"
              placeholder="By Centimeter"
            />
            <CRNumberInput
              name="bottom"
              label="Bottom"
              layout="inline"
              placeholder="By Centimeter"
            />
            <CRNumberInput
              name="left"
              label="Left"
              layout="inline"
              placeholder="By Centimeter"
            />
          </Div>
        </Form>
      </>
    </>
  );
};

export default Configurations;
