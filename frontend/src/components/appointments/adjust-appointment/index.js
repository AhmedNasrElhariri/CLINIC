import React, { useState, useCallback } from 'react';
import {
  Icon,
  DatePicker,
  Modal,
  Divider,
  Button,
  Alert,
  Form,
  FormControl,
} from 'rsuite';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';

import { Div } from 'components';
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

export default ({ appointment, iconSize = 'lg' }) => {
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
      <EditOLIcon onClick={() => onOpen('edit')} ml={2} />
      <DeleteOLIcon onClick={() => onOpen('cancel')} ml={2} />

      <Modal show={visible.edit}>
        <Form formValue={formValue} onChange={setFormValue}>
          <Div my={3}>
            <Div as="h6" mb={2}>
              Old Date
            </Div>
            {formatDate(appointment.date, STANDARD_DATE_FORMAT + ' HH:mm')}
            <Divider />
            <Div as="h6" mb={2}>
              New Date
            </Div>
            <Div display="flex">
              <Div flexGrow={1}>
                <FormControl
                  format={STANDARD_DATE_FORMAT}
                  disabledDate={isBeforeToday}
                  accepter={DatePicker}
                  name="date"
                  block
                />
              </Div>
              <Div flexGrow={1}>
                <FormControl
                  format="HH:mm"
                  hideMinutes={minute => minute % 5 !== 0}
                  name="time"
                  accepter={DatePicker}
                  disabledDate={isBeforeToday}
                  block
                />
              </Div>
            </Div>
          </Div>
        </Form>
        <Modal.Footer>
          <Button appearance="primary" onClick={onAdjust}>
            Adjust
          </Button>
          <Button appearance="subtle" onClick={() => onClose('edit')}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal backdrop="static" show={visible.cancel} size="xs">
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24,
            }}
          />
          Cancel Appointment?
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={onCancel}>
            Ok
          </Button>
          <Button appearance="subtle" onClick={() => onClose('cancel')}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Div>
  );
};
