import React, { useState } from 'react';
import * as moment from 'moment';
import { ACTIONS } from 'utils/constants';
import {
  Div,
  CRModal,
  CRCard,
  H6,
  CRDatePicker,
  CRBrancheTree,
} from 'components';
import { Form, DatePicker } from 'rsuite';
import { formatDate, isBeforeToday } from 'utils/date';
import { STANDARD_DATE_FORMAT } from 'utils/constants';
import { useAppointmentForm, useAppointments } from 'hooks';

const EditAppointment = ({ visible, onOk, onClose, appointment }) => {
  const [formValue, setFormValue] = useState({
    date: null,
    time: null,
    branchId:null,
    specialtyId:null,
    userId:null,
  });

  const { appointments } = useAppointments();
  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    appointments,
  });

  if (!appointment) {
    return null;
  }

  return (
    <CRModal
      show={visible}
      header="Adjust Appointment"
      bodyStyle={{
        padding: '10px 89px ',
      }}
      okTitle="Adjust"
      onOk={() => onOk(formValue)}
      onCancel={onClose}
      onHide={onClose}
    >
      <Form formValue={formValue} onChange={setFormValue} fluid>
        <Div my={1}>
          <CRCard>
            <H6 color="texts.1" mb={1}>
              Old Date
            </H6>
            <H6>
              {formatDate(
                appointment.date,
                STANDARD_DATE_FORMAT + ' - hh:mm a'
              )}
            </H6>
          </CRCard>

          <CRCard mt={10} pb={50}>
            <H6 color="texts.1" mb={1}>
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
                disabledMinutes={minute =>
                  disabledMinutes(minute, moment(formValue.time).hours())
                }
                hideHours={hideHours}
                style={{ marginTop: '10px' }}
                onSelectTrigger
                block
              />
              <CRBrancheTree
                formValue={formValue}
                onChange={setFormValue}
                action={ACTIONS.Create_Appointment}
              />
            </Div>
          </CRCard>
        </Div>
      </Form>
    </CRModal>
  );
};

export default EditAppointment;
