import React, { useState } from 'react';
import { usePatients } from 'hooks';
import ListPatientCoupons from './list-patient-coupons';
import ListCouponTransactions from './list-coupon-transactions';
import { Div, H3, CRButton } from 'components';
const PatientCoupons = ({ patient }) => {
  const [couponId, setCouponId] = useState(null);
  const [showCouponTransactions, setShowCouponTransactions] = useState(false);
  const { patientCoupons, couponPointsTransactions } = usePatients({
    patientId: patient.id,
    all: true,
    couponId: couponId,
  });
  return (
    <>
      <Div display="flex" justifyContent="space-between" mb={20} ml={10}>
        {showCouponTransactions ? (
          <H3>Coupon Transactions</H3>
        ) : (
          <H3>Coupons</H3>
        )}
        {showCouponTransactions && (
          <CRButton onClick={() => setShowCouponTransactions(false)}>
            Get All Coupons
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
