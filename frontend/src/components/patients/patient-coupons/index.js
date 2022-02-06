import React from 'react';
import { usePatients } from 'hooks';
import ListPatientCoupons from './list-patient-coupons';
const PatientCoupons = ({ patient }) => {
  const { patientCoupons } = usePatients({ patientId: patient.id, all: true });
  return <ListPatientCoupons coupons={patientCoupons} />;
};

export default PatientCoupons;
