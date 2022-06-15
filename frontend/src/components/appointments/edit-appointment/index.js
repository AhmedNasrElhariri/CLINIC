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

const EditAppointment = ({ show, onCancel, onOk, appointment, t }) => {
  const [formValue, setFormValue] = useState({
    date: null,
    time: null,
    branchId: null,
    specialtyId: null,
    userId: null,
  });

  const { appointmentsCount } = useAppointments({
    date: formValue?.date,
    userId: formValue?.userId,
  });
  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    appointments: appointmentsCount?.appointments || [],
  });

  if (!appointment) {
    return null;
  }

  return (
    <CRModal
      show={show}
      header={t('adjustAppointment')}
      bodyStyle={{
        padding: '10px 89px ',
      }}
      okTitle={t('adjust')}
      onOk={() => {
        onOk(formValue);
      }}
      onCancel={onCancel}
      onHide={onCancel}
    >
      <Form formValue={formValue} onChange={setFormValue} fluid>
        <Div my={1}>
          <CRCard>
            <H6 color="texts.1" mb={1}>
              {t('oldDate')}
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
              {t('newDate')}
            </H6>
            <Div px={53}>
              <CRBrancheTree
                formValue={formValue}
                onChange={setFormValue}
                showUserAndOrganization={false}
                action={ACTIONS.Reschedule_Appointment}
              />
              <CRDatePicker
                disabledDate={isBeforeToday}
                accepter={DatePicker}
                name="date"
                block
              />
              {formValue.userId && (
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
              )}
            </Div>
          </CRCard>
        </Div>
      </Form>
    </CRModal>
  );
};

export default EditAppointment;
