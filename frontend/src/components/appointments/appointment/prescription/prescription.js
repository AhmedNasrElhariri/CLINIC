import React from 'react';
import {
  Container,
  Medicine,
  Ul,
  Li,
  PrescriptionPrintout,
  StyledFooterData,
} from './style';
import { Div, H6 } from 'components';
import { formatFullDay } from 'utils/date';
import { useConfigurations } from 'hooks';
const PrescriptionPrinting = ({
  ref,
  newMedicine,
  enable,
  direction,
  nextAppointment,
}) => {
  const { pageSetupData } = useConfigurations();
  return (
    <Div
      mt={pageSetupData?.top || 0}
      mr={pageSetupData?.right || 0}
      mb={pageSetupData?.bottom || 0}
      ml={pageSetupData?.left || 0}
      ref={ref}
    >
      {newMedicine?.length === '0' ? (
        <Div>No Medicines</Div>
      ) : (
        newMedicine?.map((element, indx) => (
          <Div>
            <Div>
              <Div>{element.medicine.name}</Div>
              <Div display="flex">
                <Div>
                  {element.dose}
                  &nbsp;
                </Div>
                <Div>{element.tE}&nbsp;</Div>
                <Div>for&nbsp;</Div>
                <Div>{element.duration}&nbsp;</Div>
                <Div>{element.period}</Div>
              </Div>
            </Div>
          </Div>
        ))
      )}
    </Div>
  );
};

export default PrescriptionPrinting;
