import React from 'react';

import { Div, CRModal, H3 } from 'components';

const CancelAppointment = ({ visible, onOk, onClose }) => {
  return (
    <CRModal
      onOk={onOk}
      onCancel={onClose}
      onHide={onClose}
      show={visible}
      header="Cancel Appointment"
    >
      <Div textAlign="center">
        <H3>Are you sure that you want to cancel the Appointment ?</H3>
      </Div>
    </CRModal>
  );
};

export default CancelAppointment;
