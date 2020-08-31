import React, { useState, useCallback } from 'react';
import { DatePicker, Alert, Form } from 'rsuite';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { Div, CRModal, CRCard, CRDatePicker, H6 } from 'components';
import { STANDARD_DATE_FORMAT } from 'utils/constants';
import { isBeforeToday, formatDate } from 'utils/date';
import { ADJUST_APPOINTMENT, CANCEL_APPOINTMENT } from 'apollo-client/queries';

import { EditOLIcon, DeleteOLIcon } from 'components/icons';
import { Can } from 'components/user/can';

const calcDate = ({ date, time }) =>
  moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
      second: 0,
      millisecond: 0,
    })
    .toDate();

const AdjustAppointment = ({
  appointment,
  cancelComp,
  editComp,
  onClickEdit,
  children,
  onCancel,
  onAdjust,
}) => {
  const [visible, setVisible] = useState({ edit: false, cancel: false });
  const [formValue, setFormValue] = useState({
    date: null,
    time: null,
  });

  const [adjust] = useMutation(ADJUST_APPOINTMENT, {
    onCompleted: ({ adjustAppointment }) => {
      setVisible({ edit: false });
      onAdjust({ ...appointment, ...adjustAppointment });
      Alert.success('Appointment has been changed successfully');
    },
  });

  const [cancel] = useMutation(CANCEL_APPOINTMENT, {
    onCompleted: () => {
      setVisible({ cancel: false });
      onCancel(appointment);
      Alert.success('Appointment has been cancelled successfully');
    },
  });

  const handleAdjust = useCallback(() => {
    adjust({ variables: { id: appointment.id, date: calcDate(formValue) } });
  }, [adjust, formValue, appointment]);

  const handleCancel = useCallback(() => {
    cancel({ variables: { id: appointment.id } });
  }, [cancel, appointment]);

  const onOpen = useCallback(type => {
    setVisible({ [type]: true });
  }, []);

  const onClose = useCallback(type => {
    setVisible({ [type]: false });
  }, []);

  const getStateAndHelpers = () => {
    return {
      onEdit: () => onOpen('edit'),
      onCancel: () => onOpen('cancel'),
    };
  };

  return (
    <Div display="inline-flex">
      {children ? (
        children(getStateAndHelpers())
      ) : (
        <>
          <Can I="reschedule" an="Appointment">
            <EditOLIcon
              onClick={() => {
                onOpen('edit');
              }}
              ml={2}
            />
          </Can>
          <Can I="delete" an="Appointment">
            <DeleteOLIcon onClick={() => onOpen('cancel')} ml={2} />
          </Can>
        </>
      )}

      <CRModal
        show={visible.edit}
        header="Adjust Appointment"
        bodyStyle={{
          padding: '40px 89px ',
        }}
        okTitle="Adjust"
        onOk={handleAdjust}
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
                  placement="top"
                  block
                />
              </Div>
            </CRCard>
          </Div>
        </Form>
      </CRModal>

      <CRModal
        onOk={handleCancel}
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

export default AdjustAppointment;
