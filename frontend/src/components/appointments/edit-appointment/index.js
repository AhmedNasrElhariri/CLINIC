import React, { useState } from 'react';

import { Div, CRModal, CRCard, H6, CRDatePicker } from 'components';
import { Form, DatePicker } from 'rsuite';
import { formatDate, isBeforeToday } from 'utils/date';
import { STANDARD_DATE_FORMAT } from 'utils/constants';

const EditAppointment = ({ visible, onOk, onClose, appointment }) => {
  const [formValue, setFormValue] = useState({
    date: null,
    time: null,
  });

  if (!appointment) {
    return null;
  }

  return (
    <CRModal
      show={visible}
      header="Adjust Appointment"
      bodyStyle={{
        padding: '40px 89px ',
      }}
      okTitle="Adjust"
      onOk={() => onOk(formValue)}
      onCancel={onClose}
      onHide={onClose}
    >
      <Form formValue={formValue} onChange={setFormValue} fluid>
        <Div my={3}>
          <CRCard>
            <H6 color="texts.1" mb={3}>
              Old Date
            </H6>
            <H6>
              {formatDate(
                appointment.date,
                STANDARD_DATE_FORMAT + ' - hh:mm a'
              )}
            </H6>
          </CRCard>

          <CRCard mt={40} pb={50}>
            <H6 color="texts.1" mb={3}>
              New Date
            </H6>
            <Div px={53}>
              <CRDatePicker
                disabledDate={isBeforeToday}
                accepter={DatePicker}
                name="date"
                block
              />
              <CRDatePicker
                format="HH:mm"
                hideMinutes={minute => minute % 5 !== 0}
                name="time"
                accepter={DatePicker}
                disabledDate={isBeforeToday}
                placement="top"
                block
              />
            </Div>
          </CRCard>
        </Div>
      </Form>
    </CRModal>
  );
};

export default EditAppointment;
