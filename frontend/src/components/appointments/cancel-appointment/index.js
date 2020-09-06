import React from 'react';

import { Div, CRModal } from 'components';

const CancelAppointment = ({ visible, onOk, onClose }) => {
  
  return (
    <CRModal
      onOk={onOk}
      onCancel={onClose}
      onHide={onClose}
      show={visible}
      header="Cancel Appointment"
    >
      <Div textAlign="center">Are you Sure you want to Cancel Appointment?</Div>
    </CRModal>
  );
};

export default CancelAppointment;
