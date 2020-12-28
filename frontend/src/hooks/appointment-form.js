import { useMemo, useCallback } from 'react';
import * as moment from 'moment';
import { isUrgent } from 'services/appointment';

function useAppointmentForm({ date, type, selectedHour, appointments }) {
  const selectedDayAppointments = useMemo(
    () => appointments.filter(({ date }) => moment(date).isSame(date, 'day')),
    [appointments]
  );

  const hideHours = useCallback(
    hours => {
      const hourDate = moment(date).set({
        hours,
      });
      if (hourDate.isBefore(moment(), 'hours')) {
        return true;
      }
      if (isUrgent({ type })) {
        return false;
      }
      return (
        selectedDayAppointments.filter(app =>
          moment(app.date).isSame(hourDate, 'hours')
        ).length >= 12
      );
    },
    [date, selectedDayAppointments, type]
  );

  const disabledMinutes = useCallback(
    minute => {
      if (isUrgent({ type })) {
        return false;
      }
      const selectedDate = date;

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
        const endDate = moment(startDate).add(5, 'minutes');
        return newDate.isBetween(startDate, endDate, 'minutes', '[)');
      });
    },
    [date, selectedDayAppointments, selectedHour, type]
  );

  return useMemo(
    () => ({
      hideHours,
      disabledMinutes,
    }),
    [disabledMinutes, hideHours]
  );
}

export default useAppointmentForm;