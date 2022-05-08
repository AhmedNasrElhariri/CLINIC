import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'rsuite';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { Can } from 'components/user/can';
import { Div } from 'components';
import {
  ADJUST_APPOINTMENT,
  CANCEL_APPOINTMENT,
  LIST_APPOINTMENTS,
} from 'apollo-client/queries';

import { EditOLIcon, DeleteOLIcon } from 'components/icons';
import EditAppointment from '../edit-appointment';
import CancelAppointment from '../cancel-appointment';
import { useModal } from 'hooks';

const calcDate = ({ date, time }) =>
  moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
      second: 0,
      millisecond: 0,
    })
    .toDate();

export const useAdjustAppointment = ({
  onAdjust = () => {},
  onCancel = () => {},
} = {}) => {
  const [visible, setVisible] = useState({ edit: false, cancel: false });
  const [appointment, setAppointment] = useState(null);

  const [adjust] = useMutation(ADJUST_APPOINTMENT, {
    onCompleted: ({ adjustAppointment }) => {
      setVisible({ edit: false });
      onAdjust({ ...appointment, ...adjustAppointment });
      Alert.success('Appointment has been changed successfully');
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
      },
    ],
  });

  const [cancel] = useMutation(CANCEL_APPOINTMENT, {
    onCompleted: () => {
      setVisible({ cancel: false });
      onCancel(appointment);
      Alert.success('Appointment has been cancelled successfully');
    },
  });

  const handleEdit = useCallback(
    formValue => {
      adjust({
        variables: {
          id: appointment.id,
          date: calcDate(formValue),
          branchId: formValue.branchId,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
        },
      });
    },
    [adjust, appointment]
  );

  const handleCancel = useCallback(() => {
    cancel({ variables: { id: appointment.id } });
  }, [cancel, appointment]);

  return {
    appointment,
    setAppointment,
    edit: handleEdit,
    cancel: handleCancel,
    visible,
    setVisible,
  };
};

const AdjustAppointment = ({ appointment, children, onCancel, onAdjust }) => {
  const { edit, cancel, setVisible, setAppointment } = useAdjustAppointment();
  const { visible, close, open } = useModal({});
  useEffect(() => {
    setAppointment(appointment);
  }, [appointment, setAppointment]);

  const onOpen = useCallback(
    type => {
      open();
    },
    [open]
  );

  const onClose = useCallback(
    type => {
      setVisible({ [type]: false });
    },
    [setVisible]
  );

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
          <Can I="Reschedule" an="Appointment">
            <EditOLIcon
              onClick={e => {
                e.stopPropagation();
                onOpen('edit');
              }}
              ml={2}
            />
          </Can>
          <Can I="Cancel" an="Appointment">
            <DeleteOLIcon
              onClick={e => {
                e.stopPropagation();
                onOpen('cancel');
              }}
              ml={2}
            />
          </Can>
        </>
      )}

      <EditAppointment
        onOk={edit}
        visible={visible}
        appointment={appointment}
        // onClose={() => onClose('edit')}
      />

      <CancelAppointment
        visible={visible.cancel}
        appointment={appointment}
        onOk={cancel}
        onClose={() => onClose('cancel')}
      />
    </Div>
  );
};

export default AdjustAppointment;
