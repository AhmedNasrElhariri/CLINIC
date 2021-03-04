import React from 'react';

import { NewPatient, Div, H4 } from 'components';
import {
  PatientModalBodyStyled,
  ModalBodyHeaderStyled,
  NewPatientModalBody,
} from './style';

const NewAppointmentModal = ({ open, onHide }) => {
  return (
    <>
      <PatientModalBodyStyled show={open} onHide={onHide}>
        <ModalBodyHeaderStyled>
          <Div>
            <H4 fontWeight="bold" textTransform="uppercase" textAlign="center">
              New Patient
            </H4>
          </Div>
        </ModalBodyHeaderStyled>
        <NewPatientModalBody>
          <NewPatient onCreate={onHide} />
        </NewPatientModalBody>
      </PatientModalBodyStyled>
    </>
  );
};

export default NewAppointmentModal;
