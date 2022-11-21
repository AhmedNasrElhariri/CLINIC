import React, { useEffect, useRef, useState } from 'react';
import { useConfigurations, useMedicineDefinitions } from 'hooks';
import { Div } from 'components';
import { PrintMedicine, PrescriptionPrintout } from './style';

function Prescription({ medicine, printRef, ...rest }) {
  const { medicineDefinitions } = useMedicineDefinitions();
  const [normalizedMedicines, setNormalizedMedicines] = useState({});
  const { pageSetupData } = useConfigurations();
  const pageSetupRow = pageSetupData.find(
    element => element.type === 'prescription'
  );

  useEffect(() => {
    const normalizedMedicines = medicineDefinitions.reduce(
      (acc, medicine) => ({
        ...acc,
        [medicine.id]: medicine,
      }),
      {}
    );
    console.log(normalizedMedicines);
    setNormalizedMedicines(normalizedMedicines);
  }, [medicineDefinitions]);

  return (
    <>
      <PrescriptionPrintout
        ref={printRef}
        mt={pageSetupRow?.top * 37.7952755906 || 0}
        mr={pageSetupRow?.right * 37.7952755906 || 0}
        mb={pageSetupRow?.bottom * 37.7952755906 || 0}
        ml={pageSetupRow?.left * 37.7952755906 || 0}
      >
        {medicine.map((element, index) => (
          <PrintMedicine key={index}>
            <Div className="flex">
              <Div mr={2} fontWeight="bold">
                {normalizedMedicines[element.medicineId].name}
              </Div>
              <Div>{element.dose}&nbsp;</Div>
            </Div>
          </PrintMedicine>
        ))}
      </PrescriptionPrintout>
    </>
  );
}

Prescription.defaultProps = {
  type: 'create',
};

export default Prescription;
