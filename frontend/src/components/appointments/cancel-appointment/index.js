import { Div, CRModal, H3 } from 'components';

const CancelAppointment = ({ show, onOk, onCancel, t }) => {
  return (
    <CRModal
      onOk={onOk}
      onCancel={onCancel}
      onHide={onCancel}
      show={show}
      header={t('cancelAppointment')}
    >
      <Div textAlign="center">
        <H3>{t('cancelAppointmentMessage')}</H3>
      </Div>
    </CRModal>
  );
};

export default CancelAppointment;
