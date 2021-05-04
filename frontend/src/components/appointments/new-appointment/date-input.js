import React, { useState, useCallback, useMemo, useEffect } from 'react';
import * as moment from 'moment';
import { DatePicker } from 'rsuite';

import { CRTimePicker, CRDatePicker } from 'components';
import { isBeforeToday } from 'utils/date';

const initialValues = {
  day: new Date(),
  time: null,
};

const DateInput = ({ appointments, onChange }) => {
  const [formValue, setFormValue] = useState(initialValues);
  const [selectedHour, setSelectedHour] = useState(null);

  const selectedDayAppointments = useMemo(
    () =>
      appointments.filter(({ date }) =>
        moment(date).isSame(formValue.day, 'day')
      ),
    [appointments, formValue]
  );

  const disabledMinutes = useCallback(
    minute => {
      const selectedDate = formValue.day;

      const newDate = moment(selectedDate).set({
        hours: selectedHour,
        minute: minute,
      });

      const isBeforeNow = newDate.isBefore(moment(), 'minute');
      if (isBeforeNow) {
        return true;
      }

      return selectedDayAppointments.some(({ date }) => {
        const startDate = moment(date);
        const endDate = moment(startDate).add(15, 'minutes');
        return newDate.isBetween(startDate, endDate, 'minutes', '[)');
      });
    },
    [formValue.day, selectedDayAppointments, selectedHour]
  );

  const hideHours = useCallback(
    hours => {
      const hourDate = moment(formValue.day).set({
        hours,
      });
      return selectedDayAppointments.some(app => {
        return moment(app.date).isSame(hourDate, 'hours');
      });
    },
    [formValue.day, selectedDayAppointments]
  );

  const updateForm = useCallback(
    name => {
      return val => {
        setFormValue({ ...formValue, [name]: val });
      };
    },
    [formValue]
  );

  useEffect(() => {
    const timeDate = moment(formValue.time);
    const date = moment(formValue.day).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
  }, [formValue, onChange]);

  return (
    <>
      <CRDatePicker
        label="Date"
        block
        value={formValue.day}
        onChange={updateForm('day')}
        accepter={DatePicker}
        disabledDate={isBeforeToday}
      />

      <CRTimePicker
        label="Time"
        block
        value={formValue.time}
        onChange={updateForm('time')}
        accepter={DatePicker}
        hideHours={hideHours}
        startHour={8}
      />
    </>
  );
};

DateInput.propTypes = {};

DateInput.defaultProps = {
  appointments: [],
};

export default DateInput;
