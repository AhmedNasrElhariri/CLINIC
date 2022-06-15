import React, { useState } from 'react';
import { usePatients } from 'hooks';
import ListPatientCoupons from './list-patient-coupons';
import ListCouponTransactions from './list-coupon-transactions';
import { Div, H3, CRButton } from 'components';
import { useTranslation } from 'react-i18next';

const PatientCoupons = ({ patient }) => {
  const [couponId, setCouponId] = useState(null);
  const [showCouponTransactions, setShowCouponTransactions] = useState(false);
  const { t } = useTranslation();
  const { patientCoupons, couponPointsTransactions } = usePatients({
    patientId: patient.id,
    all: true,
    couponId: couponId,
  });
  return (
    <>
      <Div display="flex" justifyContent="space-between" mb={20} ml={10}>
        {showCouponTransactions ? (
          <H3>{t('couponTransactions')}</H3>
        ) : (
          <H3>{t('patientCoupons')}</H3>
        )}
        {showCouponTransactions && (
          <CRButton onClick={() => setShowCouponTransactions(false)}>
            {t('getAllCoupons')}
          </CRButton>
        )}
      </Div>
      {showCouponTransactions ? (
        <ListCouponTransactions transactions={couponPointsTransactions} />
      ) : (
        <ListPatientCoupons
          coupons={patientCoupons}
          setCouponId={setCouponId}
          setShowCouponTransactions={setShowCouponTransactions}
        />
      )}
    </>
  );
};

export default PatientCoupons;
