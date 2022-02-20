import React from 'react';

import { Div, CRModal, H3 } from 'components';

const CancelAppointment = ({ show, onOk, onCancel }) => {
  return (
    <CRModal
      onOk={onOk}
      onCancel={onCancel}
      onHide={onCancel}
      show={show}
      header="Cancel Appointment"
    >
      <Div textAlign="center">
        <H3>Are you sure that you want to cancel the Appointment ?</H3>
      </Div>
    </CRModal>
  );
};

export default CancelAppointment;
