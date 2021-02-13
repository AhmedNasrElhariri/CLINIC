import React, { useState, useMemo, useCallback } from 'react';
import { Alert } from 'rsuite';
import moment from 'moment';
import { momentLocalizer, Views } from 'react-big-calendar';

import { Div } from 'components';
import NewEvent from './new-event';

import useFetchAppointments from 'hooks/use-appointments';
import components from './custom-components';
import CalendarContext from './context';

import { CalendarStyled } from './style';
import { useAdjustAppointment } from '../adjust-appointment/index';
import EditAppointment from '../edit-appointment/index';
import CancelAppointment from '../cancel-appointment/index';
import { MIN_EVENT_DURATION } from 'utils/constants';
import useFetchEvents from 'hooks/fetch-evets';
import { Can } from 'components/user/can';
import useAuth from 'hooks/auth';

import Filter from './filter';
import { filterTodayAppointments } from 'services/appointment';

const localizer = momentLocalizer(moment);

const variants = {
  Examination: 'one',
  Followup: 'two',
  Urgent: 'three',
  Session: 'four',
};

const initialValue = {
  name: '',
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
};

let allViews = Object.keys(Views).map(k => Views[k]);

const createDateTime = (date, time) =>
  moment(date)
    .set({
      hour: moment(time).hours(),
      minutes: moment(time).minutes(),
    })
    .toDate();

const calculateNewEventDates = ({ startDate, startTime, endDate, endTime }) => {
  return {
    start: createDateTime(startDate, startTime),
    end: createDateTime(endDate, endTime),
  };
};
function AppointmentCalendar() {
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(initialValue);
  const { can } = useAuth();
  const { events, createEvent } = useFetchEvents({
    onCreated: () => {
      setFormValue(initialValue);
      setVisible(false);
    },
  });

  const { appointments: data, patientsDoctors } = useFetchAppointments();

  const {
    edit,
    cancel,
    appointment,
    setAppointment,
    visible: adjustVisible,
    setVisible: setAdjustVisible,
  } = useAdjustAppointment();

  const appointments = useMemo(
    () =>
      data.map(p => ({
        ...p,
        name: p.type,
        start: new Date(p.date),
        end: moment(p.date).add(15, 'minutes').toDate(),
        variant: variants[p.type],
      })),
    [data]
  );

  const filteredAppointments = useMemo(
    () => filterTodayAppointments(appointments, formValue),
    [appointments, formValue]
  );

  const mappedEvents = useMemo(
    () =>
      events.map(p => ({
        ...p,
        start: moment(p.start).toDate(),
        end: moment(p.end).toDate(),
        variant: 'five',
      })),
    [events]
  );

  const onOpen = useCallback(
    type => {
      setAdjustVisible({ [type]: true });
    },
    [setAdjustVisible]
  );

  const onClose = useCallback(
    type => {
      setAdjustVisible({ [type]: false });
    },
    [setAdjustVisible]
  );

  const handleAdjust = useCallback(
    id => {
      const appointment = filteredAppointments.find(a => a.id === id);
      setAppointment(appointment);
      onOpen('edit');
    },
    [filteredAppointments, onOpen, setAppointment]
  );

  const handleCancel = useCallback(
    id => {
      const appointment = filteredAppointments.find(a => a.id === id);
      setAppointment(appointment);
      onOpen('cancel');
    },
    [filteredAppointments, onOpen, setAppointment]
  );

  const allEvents = useMemo(() => [...filteredAppointments, ...mappedEvents], [
    filteredAppointments,
    mappedEvents,
  ]);

  const handleSelect = ({ start, end }) => {
    if (!can('create_event', 'Calendar')) {
      return;
    }
    setVisible(true);
    setFormValue({
      ...formValue,
      startDate: start,
      startTime: null,
      endDate: end,
      endTime: null,
    });
  };

  const onCreateEvent = () => {
    const { start, end } = calculateNewEventDates(formValue);
    const { name } = formValue;
    if (!(start && end && name)) {
      Alert.error('All fields should be set');
      return;
    }
    if (moment(end).diff(start, 'minutes') < MIN_EVENT_DURATION) {
      Alert.error('Event duration should be equal or larger than 15 min');
      return;
    }
    createEvent({
      name,
      start,
      end,
    });
  };

  return (
    <Can I="view" a="Calendar">
      <CalendarContext.Provider
        value={{ onCancel: handleCancel, onAdjust: handleAdjust }}
      >
        <Filter
          formValue={formValue}
          onChange={setFormValue}
          doctors={patientsDoctors}
        />
        <Div bg="white" p={30}>
          <div style={{ height: 753 }}>
            <CalendarStyled
              events={formValue.doctor ? allEvents : []}
              views={allViews}
              localizer={localizer}
              components={components}
              step={15}
              timeslots={1}
              onSelectSlot={handleSelect}
              longPressThreshold={2000}
              defaultView={Views.MONTH}
              showMultiDayTimes
              selectable
              popup
            />
          </div>
          <NewEvent
            show={visible}
            onOk={onCreateEvent}
            onCancel={() => setVisible(false)}
            formValue={formValue}
            onChange={setFormValue}
          />
        </Div>
        <EditAppointment
          onOk={edit}
          visible={adjustVisible.edit}
          appointment={appointment}
          onClose={() => onClose('edit')}
        />
        <CancelAppointment
          visible={adjustVisible.cancel}
          appointment={appointment}
          onOk={cancel}
          onClose={() => onClose('cancel')}
        />
      </CalendarContext.Provider>
    </Can>
  );
}

export default AppointmentCalendar;
