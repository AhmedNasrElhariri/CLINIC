import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Alert } from 'rsuite';
import moment from 'moment';
import { momentLocalizer, Views } from 'react-big-calendar';

import { Div } from 'components';
import NewEvent from './new-event';

import components from './custom-components';
import CalendarContext from './context';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { CalendarStyled } from './style';
import { useAdjustAppointment } from '../adjust-appointment/index';
import EditAppointment from '../edit-appointment/index';
import CancelAppointment from '../cancel-appointment/index';
import { MIN_EVENT_DURATION } from 'utils/constants';
import { useEvents, useAuth } from 'hooks';
import { useTranslation } from 'react-i18next';
import Filter from './filter';
import { filterTodayAppointments } from 'services/appointment';
import useGlobalState from 'state';
import {
  endOfMonth,
  startOfWeek,
  getEndOfDay,
  getStartOfDay,
  startOfMonth,
  endOfWeek,
} from 'utils/date';
import {
  LIST_ALL_APPOINTMENTS,
  LIST_ORGANIZATION_DOCTORS,
} from 'apollo-client/queries';
import { APPT_STATUS } from 'utils/constants';
const localizer = momentLocalizer(moment);

const variants = {
  Examination: 'one',
  Followup: 'two',
  Urgent: 'three',
  Session: 'four',
};

const initialValue = {
  name: '',
  startDate: new Date(),
  startTime: null,
  endDate: new Date(),
  endTime: null,
  doctorId: null,
  view: 'day',
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
  const [onCreateAppointment] = useGlobalState('onCreateAppointment');
  const today = new Date();
  const { can } = useAuth();
  const { t } = useTranslation();
  const { events, createEvent } = useEvents({
    onCreated: () => {
      setFormValue(initialValue);
      setVisible(false);
    },
  });
  const period = useMemo(() => {
    const { view, startDate, endDate } = formValue;
    if (view === 'day') {
      return [getStartOfDay(startDate), getEndOfDay(endDate)];
    } else if (view === 'week') {
      return [startOfWeek(startDate), endOfWeek(endDate)];
    } else {
      return [startOfMonth(startDate), endOfMonth(endDate)];
    }
  }, [formValue]);
  const { data: doctorsData } = useQuery(LIST_ORGANIZATION_DOCTORS);

  const doctors = useMemo(
    () => R.propOr([], 'listOrganizationDoctors')(doctorsData),
    [doctorsData]
  );

  const { data, refetch: refetchAllAppointments } = useQuery(
    LIST_ALL_APPOINTMENTS,
    {
      variables: Object.assign(
        {
          status: APPT_STATUS.SCHEDULED,
        },
        period && { dateFrom: period[0] },
        period && { dateTo: period[1] },
        formValue.doctorId && { doctorId: formValue.doctorId }
      ),
      fetchPolicy: 'cache-and-network',
    }
  );
  useEffect(() => {
    const id = onCreateAppointment.subscribe(() => {
      refetchAllAppointments();
    });
    return () => onCreateAppointment.unsubscribe(id);
  }, [onCreateAppointment, refetchAllAppointments]);
  const DATA = R.propOr([], 'allAppointments')(data);
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
      (DATA || []).map(p => ({
        ...p,
        name: p.type,
        start: new Date(p.date),
        end: moment(p.date).add(p.duration, 'minutes').toDate(),
        variant: variants[p.type],
      })),
    [DATA]
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

  const allEvents = useMemo(
    () => [...filteredAppointments, ...mappedEvents],
    [filteredAppointments, mappedEvents]
  );
  const handleSelect = ({ start, end }) => {
    if (!can('create_event', 'Calendar')) {
      return;
    }
    setVisible(true);
    setFormValue(prev => ({
      ...prev,
      startDate: start,
      startTime: null,
      endDate: end,
      endTime: null,
    }));
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
  const handleNa = useCallback(
    val => {
      setFormValue({
        ...formValue,
        startDate: val,
        endDate: val,
      });
    },
    [setFormValue]
  );
  const handleView = useCallback(
    val => {
      setFormValue(prev => ({
        ...prev,
        view: val,
      }));
    },
    [setFormValue]
  );
  const handleDateChange = useCallback(
    val => {
      setFormValue({
        ...formValue,
        startDate: getStartOfDay(val),
        endDate: getEndOfDay(val),
      });
    },
    [setFormValue]
  );
  return (
    <CalendarContext.Provider
      value={{ onCancel: handleCancel, onAdjust: handleAdjust }}
    >
      <Filter formValue={formValue} onChange={setFormValue} doctors={doctors} />
      <Div bg="white" p={30}>
        <div style={{ height: 753 }}>
          <CalendarStyled
            events={allEvents || []}
            views={allViews}
            localizer={localizer}
            components={components}
            onNavigate={handleNa}
            onDateChange={handleDateChange}
            onView={handleView}
            step={15}
            timeslots={1}
            onSelectSlot={handleSelect}
            longPressThreshold={2000}
            defaultView={Views.DAY}
            showMultiDayTimes
            selectable
            popup
            min={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                10
              )
            }
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
        t={t}
      />
    </CalendarContext.Provider>
  );
}

export default AppointmentCalendar;
