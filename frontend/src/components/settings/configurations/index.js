import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import * as moment from 'moment';
import { Form } from 'rsuite';
import { H3, Div, CRButton, CRNumberInput } from 'components';
import PageSetup from './page-setup';
import EnableInvoiceCounter from './enable-invoice-counter/index';
import EnableSMS from './enable-sms';
import { useConfigurations } from 'hooks';

const initialValues = {
  enableInvoiceCounter: false,
  enableSMS: false,
  orgName: '',
  orgPhoneNo: '',
};
const initialPulsesValue = {
  before: 0,
  after: 0,
};
const initialPointsValue = {
  points: 0,
  couponValue: 0,
};
const initialPageSetup = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  type: 'prescription',
};

const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const [pulsesValue, setPulseValues] = useState(initialPulsesValue);
  const [pointsValue, setPointsValues] = useState(initialPointsValue);
  const [pageSetup, setPageSetup] = useState(initialPageSetup);
  const {
    configurations,
    update,
    addPulsesControl,
    getPulseControl,
    addPageSetup,
    pageSetupData,
    editPoints,
    points,
    updateSMSConf,
  } = useConfigurations();
  useEffect(() => {
    // const enableInvoiceCounter = R.propOr(
    //   false,
    //   'enableInvoiceCounter'
    // )(configurations);
    setFormValue({
      ...configurations,
    });
    const before = R.propOr(0, 'before')(getPulseControl);
    const after = R.propOr(0, 'after')(getPulseControl);
    setPulseValues({ ...pulsesValue, before, after });
  }, [configurations, getPulseControl]);
  useEffect(() => {
    setPointsValues({ points: points.points, couponValue: points.couponValue });
  }, [points, setPointsValues]);
  const handleSave = useCallback(() => {
    update(formValue);
  }, [formValue, update]);

  const handleSaveSMS = useCallback(() => {
    const { enableSMS, orgName, orgPhoneNo } = formValue;
    const newFormValue = {
      enableSMS: enableSMS || false,
      orgName: orgName || '',
      orgPhoneNo: orgPhoneNo || '',
    };
    console.log(newFormValue, 'newFormValue');
    updateSMSConf({
      variables: {
        smsConfig: newFormValue,
      },
    });
  }, [formValue, updateSMSConf]);

  useEffect(() => {
    const { type } = pageSetup;
    const pageSetupRow = pageSetupData.find(element => element.type === type);
    const top = R.propOr(0, 'top')(pageSetupRow);
    const right = R.propOr(0, 'right')(pageSetupRow);
    const bottom = R.propOr(0, 'bottom')(pageSetupRow);
    const left = R.propOr(0, 'left')(pageSetupRow);
    setPageSetup({ ...pageSetup, top, right, bottom, left });
  }, [pageSetup.type, pageSetupData]);

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
  const handlePointsSave = useCallback(() => {
    editPoints({
      variables: {
        points: pointsValue.points,
        couponValue: pointsValue.couponValue,
      },
    });
  }, [pointsValue, editPoints]);

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
      <EnableInvoiceCounter
        onChange={updateEnable}
        value={formValue?.enableInvoiceCounter}
      />
      <hr></hr>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>SMS Configuration</H3>
        <Div>
          <CRButton onClick={handleSaveSMS} variant="primary">
            Save
          </CRButton>
        </Div>
      </Div>
      <EnableSMS onChange={setFormValue} formValue={formValue} />

      <>
        <hr></hr>
        <Div display="flex" justifyContent="space-between">
          <Div display="flex" justifyContent="space-around">
            <H3 mb={64} mr={20}>
              Points Control
            </H3>
          </Div>
          <Div>
            <CRButton onClick={handlePointsSave} variant="primary">
              Save
            </CRButton>
          </Div>
        </Div>
        <Form formValue={pointsValue} onChange={setPointsValues}>
          <Div display="flex" justifyContent="space-between">
            <CRNumberInput
              name="points"
              label="The number of points to get coupon"
              layout="inline"
              placeholder="Points"
            />
            <CRNumberInput
              name="couponValue"
              label="Coupon Value"
              layout="inline"
              placeholder="Coupon Value"
            />
          </Div>
        </Form>
      </>
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
        <PageSetup pageSetup={pageSetup} setPageSetup={setPageSetup} />
      </>
    </>
  );
};

export default Configurations;
