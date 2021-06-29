import React, { useCallback } from 'react';
import { Div, H3, CRModal } from 'components';

function CompleteAppointment({ show, onOk, onCancel, appointment }) {
  const handleOk = useCallback(() => {
    onOk({
      appointment,
    });
  }, [onOk]);
  return (
    <CRModal show={show} onOk={handleOk} onHide={onCancel} onCancel={onCancel}>
      <Div>
        <H3>Are U sure that U want to complete the Appointment</H3>
      </Div>
    </CRModal>
  );
}

export default CompleteAppointment;
