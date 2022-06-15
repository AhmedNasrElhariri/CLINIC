import React, { useCallback } from 'react';
import { Div, H3, CRModal } from 'components';

function CompleteAppointment({ show, onOk, onCancel, appointment, t }) {
  const handleOk = useCallback(() => {
    onOk({
      appointment,
    });
  }, [onOk]);
  return (
    <CRModal
      show={show}
      onOk={handleOk}
      onHide={onCancel}
      onCancel={onCancel}
      header={t('archiveAppointment')}
    >
      <Div>
        <H3>{t('completeAppointmentMessage')}</H3>
      </Div>
    </CRModal>
  );
}

export default CompleteAppointment;
