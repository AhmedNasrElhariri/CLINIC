import React, { useState, useCallback } from 'react';
import { DatePicker, Alert, Form } from 'rsuite';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';

import { Div, CRModal, CRCard, CRDatePicker, H6 } from 'components';
import { STANDARD_DATE_FORMAT } from 'utils/constants';
import { isBeforeToday, formatDate } from 'utils/date';
import {
  ADJUST_APPOINTMENT,
  CANCEL_APPOINTMENT,
  LIST_APPOINTMENTS,
} from 'apollo-client/queries';

import { EditOLIcon, DeleteOLIcon } from 'components/icons';

const calcDate = ({ date, time }) =>
  moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
      second: 0,
      millisecond: 0,
    })
    .toDate();

export default ({ appointment, cancelComp, editComp }) => {
  const [visible, setVisible] = useState({ edit: false, cancel: false });
  const [formValue, setFormValue] = useState({
    date: null,
    time: null,
  });

  const [adjust] = useMutation(ADJUST_APPOINTMENT, {
    onCompleted: () => {
      setVisible({ edit: false });
      Alert.success('Appointment has been changed successfully');
    },
    update(
      cache,
      {
        data: {
          adjustAppointment: { id, date },
        },
      }
    ) {
      const { appointments } = cache.readQuery({ query: LIST_APPOINTMENTS });
      cache.writeQuery({
        query: LIST_APPOINTMENTS,
        data: {
          appointments: appointments.map(app =>
            app.id === id ? { ...app, date } : app
          ),
        },
      });
    },
  });

  const [cancel] = useMutation(CANCEL_APPOINTMENT, {
    onCompleted: () => {
      setVisible({ cancel: false });
      Alert.success('Appointment has been cancelled successfully');
    },
    update(cache) {
      const { appointments } = cache.readQuery({ query: LIST_APPOINTMENTS });
      cache.writeQuery({
        query: LIST_APPOINTMENTS,
        data: {
          appointments: appointments.filter(app => app.id !== appointment.id),
        },
      });
    },
  });

  const onAdjust = useCallback(() => {
    adjust({ variables: { id: appointment.id, date: calcDate(formValue) } });
  }, [adjust, formValue, appointment]);

  const onCancel = useCallback(() => {
    cancel({ variables: { id: appointment.id } });
  }, [cancel, appointment]);

  const onOpen = useCallback(type => {
    setVisible({ [type]: true });
  }, []);

  const onClose = useCallback(type => {
    setVisible({ [type]: false });
  }, []);

  return (
    <Div display="inline-flex">
      {editComp ? (
        React.cloneElement(editComp, {
          onClick() {
            onOpen('edit');
          },
        })
      ) : (
        <EditOLIcon onClick={() => onOpen('edit')} ml={2} />
      )}
      {cancelComp ? (
        React.cloneElement(cancelComp, {
          onClick() {
            onOpen('cancel');
          },
        })
      ) : (
        <DeleteOLIcon onClick={() => onOpen('cancel')} ml={2} />
      )}

      <CRModal
        show={visible.edit}
        header="Adjust Appointment"
        bodyStyle={{
          padding: '40px 89px ',
        }}
        okTitle="Adjust"
        onOk={onAdjust}
        onCancel={() => onClose('edit')}
        onHide={() => onClose('edit')}
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
                  block
                />
              </Div>
            </CRCard>
          </Div>
        </Form>
      </CRModal>

      <CRModal
        onOk={onCancel}
        onCancel={() => onClose('cancel')}
        show={visible.cancel}
        header="Cancel Appointment"
      >
        <Div textAlign="center">
          Are you Sure you want to Cancel Appointment?
        </Div>
      </CRModal>
    </Div>
  );
};
