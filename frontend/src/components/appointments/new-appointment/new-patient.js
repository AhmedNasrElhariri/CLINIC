import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Modal } from 'rsuite';

import { NewPatient, Div, H4 } from 'components';

const ModalBodyStyled = styled(Modal)`
  width: 810px;

  & .rs-modal-content {
    box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(40, 49, 72, 0.1);
    border-radius: 17px;
    padding: 0;
  }

  & .rs-modal-body {
    margin-top: 0;
  }
`;

const ModalBodyHeaderStyled = styled(Modal.Header)`
  padding: 35px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const NewPatientModalBody = styled(Modal.Body)`
  padding: 40px 140px 40px 160px;
  margin-right: 20px;
`;

export default function NewAppointmentModal({ open, onHide }) {
  // const [open, setOpen] = useState(true);
  // const hideModal = useCallback(() => setOpen(false), []);

  return (
    <>
      <ModalBodyStyled show={open} onHide={onHide}>
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
      </ModalBodyStyled>
    </>
  );
}
