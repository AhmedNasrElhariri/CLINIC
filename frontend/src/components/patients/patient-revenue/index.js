import React, { useMemo } from 'react';
import { usePatients } from 'hooks';
import ListPatientRevenue from './list-patient-reveue';
import Profit from '../../accounting/profit';
const PatientRevenue = ({ patient }) => {
  const { patientRevenue } = usePatients({
    patientId: patient.id,
  });
  const totalRevenues = useMemo(() => {
    let total = 0;
    total = patientRevenue?.reduce((acc, e) => acc + e?.amount, 0);
    return total;
  }, [patientRevenue]);
  return (
    <>
      <ListPatientRevenue data={patientRevenue} />
      <Profit expenses={0} revenues={totalRevenues} />
    </>
  );
};

export default PatientRevenue;
