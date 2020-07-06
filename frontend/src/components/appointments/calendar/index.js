import React, { useState, useMemo, useCallback } from 'react';
import { Alert } from 'rsuite';
import moment from 'moment';
import { momentLocalizer, Views } from 'react-big-calendar';

import { Div } from 'components';
import NewEvent from './new-event';

import useFetchAppointments from 'hooks/fetch-appointments';
import components from './custom-components';
import CalendarContext from './context';

import { CalendarStyled } from './style';
import {
  getStartOfDay,
  getEndOfDay,
  startWeekOfMonthDay,
  endWeekOfMonthDay,
} from 'services/date.service';

const localizer = momentLocalizer(moment);

const variants = {
  Examination: 'one',
  Followup: 'two',
};

const getMonthDateRange = () => ({
  fromDate: getStartOfDay(startWeekOfMonthDay()),
  toDate: getEndOfDay(endWeekOfMonthDay()),
});

const initialValue = {
  name: '',
  start: null,
  end: null,
};

const MIN_EVENT_DURATION = 15;
let allViews = Object.keys(Views).map(k => Views[k]);

function AppointmentCalendar() {
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(initialValue);
  const [events, setEvents] = useState([]);

  const { data, updateCache } = useFetchAppointments(getMonthDateRange());

  const appointments = useMemo(
    () =>
      data.map(p => ({
        ...p,
        name: p.type,
        start: new Date(p.date),
        end: moment(p.date).add(15, 'minutes').toDate(),
        variant: variants[p.type] || 'three',
      })),
    [data]
  );

  const handleCancel = useCallback(
    app => {
      const newEvents = appointments.filter(e => e.id !== app.id);
      updateCache(newEvents);
    },
    [appointments, updateCache]
  );

  const handleAdjust = useCallback(
    app => {
      const newEvents = appointments.map(a => (a.id === app.id ? app : a));
      updateCache(newEvents);
    },
    [appointments, updateCache]
  );

  const allEvents = useMemo(() => [...appointments, ...events], [
    appointments,
    events,
  ]);

  const handleSelect = ({ start, end }) => {
    setVisible(true);
    setFormValue({ ...formValue, start, end });
  };

  const onCreateEvent = () => {
    const { name, start, end } = formValue;
    if (!(start && end && name)) {
      Alert.error('All fields should be set');
      return;
    }
    if (moment(end).diff(start, 'minutes') < MIN_EVENT_DURATION) {
      Alert.error('Event duration should be equal or larger than 15 min');
      return;
    }
    Alert.success('Event has been created successfully');
    setEvents([...events, { ...formValue, variant: 'three' }]);
    setFormValue(initialValue);
    setVisible(false);
  };

  return (
    <CalendarContext.Provider
      value={{ onCancel: handleCancel, onAdjust: handleAdjust }}
    >
      <Div bg="white" p={30}>
        <div style={{ height: 753 }}>
          <CalendarStyled
            events={allEvents}
            views={allViews}
            showMultiDayTimes
            localizer={localizer}
            components={components}
            step={15}
            timeslots={1}
            onSelectSlot={handleSelect}
            longPressThreshold={2000}
            defaultView={Views.MONTH}
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
    </CalendarContext.Provider>
  );
}

export default AppointmentCalendar;
