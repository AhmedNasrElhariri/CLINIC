import React, { useState } from 'react';
import { CRButton, CRSelectInput, Div, CRNumberInput } from 'components';
import { Form, Divider } from 'rsuite';
import { useBankDefinition, useCompanyDefinition } from 'hooks';

export default function TopButtonsGroup({
  t,
  bank,
  setBank,
  appointment,
  patientCoupons,
  coupons,
  setCoupons,
  company,
  setCompany,
  payOfRemaining,
  setPayOfRemaining,
}) {
  const [visa, setVisa] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [remainingOperation, setRemainingOperation] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const { banksDefinition } = useBankDefinition({});
  const { companysDefinition } = useCompanyDefinition({});

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <CRButton
          onClick={() => {
            setVisa(true);
            setInsurance(false);
            setCoupon(false);
            setRemainingOperation(false);
          }}
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
        >
          {t('remainingPay')}
        </CRButton>
      </div>

      {visa && (
        <Form>
          <CRSelectInput
            label={t('bank')}
            name="bank"
            data={banksDefinition}
            value={bank}
            onChange={setBank}
            placeholder={t('select')}
            style={{ width: '230px' }}
          />
        </Form>
      )}

      {coupon && (
        <>
          <Div mt={20} color="bold">
            {t('points')}: {appointment?.patient.points}
          </Div>
          {patientCoupons.length === 0 && (
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
            placeholder={t('select')}
            style={{ width: '230px' }}
          />
        </Form>
      )}

      {remainingOperation && (
        <>
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
      <Divider />
    </>
  );
}
