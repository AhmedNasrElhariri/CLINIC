import { useEffect, useState } from 'react';
import { Form } from 'rsuite';
import { Spinner } from 'components/widgets/button/spinner';
import {
  H5,
  Div,
  CRButton,
  CRNumberInput,
  CRTextInput,
  CRRadio,
} from 'components';

import PrintInvoice from '../print-invoice/index';
import { CRDivider } from 'components';
import { useTranslation } from 'react-i18next';
import Price from './price';
import Payment from './payment';
import Sessions from './sessions';
const PAY_OPTIONS = [
  { name: 'Fixed', value: 'fixed' },
  { name: 'Percentage', value: 'percentage' },
];

function AppointmentInvoice({
  onChange,
  discount,
  remaining,
  appointment,
  others,
  onOthersChange,
  onRemainingChange,
  othersName,
  onOthersNameChange,
  onDiscountChange,
  sessions,
  company,
  setCompany,
  option,
  setOption,
  patientCoupons,
  bank,
  setBank,
  organization,
  handleFinish,
  coupons,
  setCoupons,
  setCouponsValue,
  couponsValue,
  loading,
  selectedSessions,
  setSelectedSessions,
  subtotal,
  totalCoupons,
  total,
  payOfRemaining,
  setPayOfRemaining,
  totalRemainingOfPayment,
}) {
  const { t } = useTranslation();
  const [visa, setVisa] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [insurance, setInsurance] = useState(false);
  useEffect(() => {
    setCouponsValue(totalCoupons);
  }, [setCouponsValue, totalCoupons]);

  return (
    <>
      {totalRemainingOfPayment > 0 && (
        <Div m="10px 0px">
          {t('theRemaining')} : {totalRemainingOfPayment}
        </Div>
      )}

      <Payment
        t={t}
        bank={bank}
        setBank={setBank}
        appointment={appointment}
        patientCoupons={patientCoupons}
        coupons={coupons}
        setCoupons={setCoupons}
        company={company}
        setCompany={setCompany}
        payOfRemaining={payOfRemaining}
        setPayOfRemaining={setPayOfRemaining}
        visa={visa}
        setVisa={setVisa}
        coupon={coupon}
        setCoupon={setCoupon}
        insurance={insurance}
        setInsurance={setInsurance}
      />

      <div className="flex mt-5 flex-col md:flex-row">
        <div className="sm:pr-5">
          <Sessions
            t={t}
            company={company}
            sessions={sessions}
            selectedSessions={selectedSessions}
            setSelectedSessions={setSelectedSessions}
            onChange={onChange}
            insurance={insurance}
          />
        </div>

        <Div>
          {!insurance && (
            <div>
              <Div mb={4}>
                <Form>
                  <CRTextInput
                    label={t('discount')}
                    name="amount"
                    value={discount}
                    onChange={val => onDiscountChange(Number(val))}
                    width={128}
                    addOn={<CRButton variant="danger">{t('applied')}</CRButton>}
                  />
                  <Div display="flex">
                    <CRTextInput
                      label={t('others')}
                      name="others"
                      value={others}
                      onChange={val => onOthersChange(Number(val))}
                    />
                    <CRTextInput
                      label={t('name')}
                      name="othersName"
                      value={othersName}
                      onChange={val => onOthersNameChange(val)}
                    />
                  </Div>
                  <CRTextInput
                    label={t('remaining')}
                    name="remaining"
                    value={remaining}
                    onChange={val => onRemainingChange(Number(val))}
                    width={210}
                  />
                </Form>
              </Div>
              <CRDivider />
              {(company !== null || bank !== null) && (
                <>
                  <Form formValue={option} onChange={setOption}>
                    <CRRadio options={PAY_OPTIONS} name="option" />
                    {(option.option === 'fixed' && company !== null) ||
                    bank !== null ? (
                      <CRNumberInput label={t('cashPayment')} name="amount" />
                    ) : (
                      option.option === 'percentage' &&
                      (company !== null || bank !== null) && (
                        <CRNumberInput
                          label={t('percentagefrom0To100')}
                          // name="price"
                          name="amount"
                        />
                      )
                    )}
                  </Form>
                  <CRDivider />
                </>
              )}
              <H5 fontWeight={400}>{t('summary')}</H5>
              <Div background="#f0f1f1" p="6px 8px">
                {others > 0 && (
                  <Price
                    name={t('others')}
                    price={others}
                    overriden
                    variant="primary"
                  />
                )}
                {payOfRemaining > 0 && (
                  <Price
                    name={t('thePayOfTheRemaining')}
                    price={payOfRemaining}
                    overriden
                    variant="primary"
                  />
                )}
                <Price name={t('subtotal')} price={subtotal} overriden />
                {couponsValue > 0 && (
                  <Price
                    name={t('couponValue')}
                    price={couponsValue}
                    overriden
                    variant="danger"
                  />
                )}
                {discount > 0 && (
                  <Price
                    name={t('discount')}
                    price={discount}
                    overriden
                    variant="danger"
                  />
                )}

                {remaining > 0 && (
                  <Price
                    name={t('remaining')}
                    price={remaining}
                    overriden
                    variant="danger"
                  />
                )}
              </Div>
              <CRDivider />
            </div>
          )}

          <Div pr="8px">
            <Price name={t('total')} price={total} />
          </Div>
        </Div>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-3 w-full md:w-1/2 mt-3">
        <PrintInvoice
          items={selectedSessions}
          subtotal={subtotal}
          total={total}
          patientName={appointment?.patient.name}
          others={others}
          remaining={remaining}
          payOfRemaining={payOfRemaining}
          option={option}
          othersName={othersName}
          discount={discount}
          organization={organization}
          couponsValue={couponsValue}
          printName={t('print')}
        />
        <CRButton onClick={handleFinish}>
          {loading ? <Spinner /> : t('finish')}
        </CRButton>
      </div>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
};

export default AppointmentInvoice;
