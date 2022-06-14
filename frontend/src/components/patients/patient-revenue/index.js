import React, { useMemo, useState } from 'react';
import { usePatients } from 'hooks';
import ListPatientRevenue from './list-patient-reveue';
import Profit from '../../accounting/profit';
const inialCurrentPage = {
  activePage: 1,
};
const PatientRevenue = ({ patient }) => {
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { patientRevenue, patientTotalRevenue, patientRevenueCounts } =
    usePatients({
      patientId: patient.id,
      page: page,
    });
  const pages = Math.ceil(patientRevenueCounts / 20);
  // const totalRevenues = useMemo(() => {
  //   let total = 0;
  //   total = patientRevenue?.reduce((acc, e) => acc + e?.amount, 0);
  //   return total;
  // }, [patientRevenue]);

  return (
    <>
      <ListPatientRevenue
        data={patientRevenue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      <Profit expenses={0} revenues={patientTotalRevenue} />
    </>
  );
};

export default PatientRevenue;
