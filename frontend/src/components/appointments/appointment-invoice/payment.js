import React, { useState } from 'react';
import {
  CRButton,
  CRSelectInput,
  Div,
  CRNumberInput,
  CRTextInput,
  CRDatePicker,
} from 'components';
import { Form, Divider } from 'rsuite';
import { useBankDefinition, useCompanyDefinition } from 'hooks';
import { paymentMthod } from 'utils/constants';
export default function Payment({
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
  visa,
  setVisa,
  coupon,
  setCoupon,
  insurance,
  setInsurance,
}) {
  const [remainingOperation, setRemainingOperation] = useState(false);
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
          style={{ backgroundColor: '#3498ff' }}
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
          style={{ backgroundColor: '#3498ff' }}
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
          style={{ backgroundColor: '#3498ff' }}
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
          style={{ backgroundColor: '#3498ff' }}
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
        <Form formValue={company} onChange={setCompany}>
          <Div display="flex">
            <CRSelectInput
              label={t('company')}
              name="companyId"
              data={companysDefinition}
              placeholder={t('select')}
              style={{ width: '230px', marginRight: '10px' }}
            />
            <CRDatePicker
              label={t('cardExpiryDate')}
              name="cardExpiryDate"
              style={{ width: '230px', marginRight: '10px' }}
            />
            <CRTextInput label={t('cardId')} name="cardId" />
          </Div>
          <Div display="flex">
            <CRSelectInput
              label={t('payment method')}
              name="paymentMethod"
              data={paymentMthod}
              placeholder={t('select')}
              style={{ width: '230px', marginRight: '10px' }}
            />
            {company.paymentMethod === 'visa' && (
              <CRSelectInput
                label={t('bank')}
                name="bankId"
                data={banksDefinition}
                placeholder={t('select')}
                style={{ width: '230px' }}
              />
            )}
          </Div>
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
