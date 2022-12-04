import React from 'react';

import { Div, CRModal, H3 } from 'components';

const TransferAppointments = ({ show, onOk, onCancel, t }) => {
  return (
    <CRModal
      onOk={onOk}
      onCancel={onCancel}
      onHide={onCancel}
      show={show}
      header={t('transferAppointment')}
    >
      <Div textAlign="center">
        <H3>{t('transferAppointmentsMessage')}</H3>
      </Div>
    </CRModal>
  );
};

export default TransferAppointments;
