import React, { useState, useEffect } from 'react';
import { Whisper, Alert } from 'rsuite';
import moment from 'moment';
import { momentLocalizer, Views } from 'react-big-calendar';

import { AdjustAppointment, Div } from 'components';
import { formatDate } from 'utils/date';
import Toolbar from './toolbar';
import NewEvent from './new-event';
import * as R from 'ramda';

import useFetchAppointments from 'hooks/fetch-appointments';

import {
  CalendarStyled,
  MonthEventStyled,
  Time,
  Name,
  IconStyled,
  WeekWrapper,
  MonthWrapper,
  WeekEventStyled,
  DayEventStyled,
  DayWrapper,
  PopoverStyled,
  PatientName,
  ActionIconStyled,
} from './style';
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

const EventDetails = ({ patient, name, start, end }) => (
  <Div>
    <Div display="flex" justifyContent="space-between" alignItems="center">
      <PatientName>{R.prop('name')(patient)}</PatientName>
      <AdjustAppointment
        appointment={{}}
        editComp={<ActionIconStyled icon="edit" />}
        cancelComp={<ActionIconStyled icon="trash-o" />}
      />
    </Div>
    <Div fontSize={14}>{name}</Div>
    <Div fontSize={14} fontWeight={600}>
      {formatDate(start, 'HH:mm A')}
      {' - '}
      {formatDate(end, 'HH:mm A')}
    </Div>
  </Div>
);

let components = {
  toolbar: Toolbar,
  month: {
    eventWrapper: props => <MonthWrapper {...props} />,
    event: ({ event }) => (
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={
          <PopoverStyled {...event}>
            <EventDetails {...event} />
          </PopoverStyled>
        }
      >
        <MonthEventStyled {...event}>
          <Div>
            <Time>{formatDate(event.start, 'HH:mm a ')}</Time>
            <Name>{event.name}</Name>
          </Div>
        </MonthEventStyled>
      </Whisper>
    ),
  },
  week: {
    eventWrapper: ({ children, ...props }) => (
      <WeekWrapper {...props}>{children}</WeekWrapper>
    ),
    event: ({ event }) => (
      <WeekEventStyled {...event}>
        <Div height="100%" display="flex" alignItems="center">
          <Div flexGrow={1} display="flex">
            <Div flexGrow={1}>
              <Time>{formatDate(event.start, 'HH:mm A')}</Time>
              <Div>
                <Name>{event.name}</Name>
              </Div>
            </Div>
            <IconStyled icon="calendar" mr={2} />
          </Div>
        </Div>
      </WeekEventStyled>
    ),
  },
  day: {
    eventWrapper: ({ children, ...props }) => (
      <DayWrapper {...props}>{children}</DayWrapper>
    ),
    event: ({ event: { name, start } }) => (
      <DayEventStyled>
        <Div height="100%" display="flex" alignItems="center">
          <Div flexGrow={1} display="flex" width="100%" alignItems="center">
            <IconStyled icon="calendar" mr={1} />
            <Time>{formatDate(start, 'HH:mm A')}</Time>
            <Div ml={2}>
              <Name>{name}</Name>
            </Div>
          </Div>
        </Div>
      </DayEventStyled>
    ),
  },
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
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(initialValue);

  const appointments = useFetchAppointments(getMonthDateRange()).map(p => ({
    ...p,
    name: p.type,
    start: new Date(p.date),
    end: moment(p.date).add(15, 'minutes').toDate(),
    variant: variants[p.type] || 'three',
  }));

  useEffect(() => {
    if (!events.length) {
      setEvents([
        {
          id: 14,
          title: 'Today',
          start: new Date(new Date().setHours(new Date().getHours() + 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 6)),
          variant: 'three',
        },
      ]);
    }
  }, []);
  // useEffect(() => {
  //   if (!events.length) {
  //     setEvents(appointments);
  //   }
  // }, [appointments, events.length]);

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
    <Div bg="white" p={30}>
      <div style={{ height: 753 }}>
        <CalendarStyled
          events={events}
          views={allViews}
          showMultiDayTimes
          localizer={localizer}
          components={components}
          step={15}
          timeslots={1}
          onSelectSlot={handleSelect}
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
  );
}

export default AppointmentCalendar;
