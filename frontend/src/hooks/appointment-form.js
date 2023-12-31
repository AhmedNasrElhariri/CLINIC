import { useMemo, useCallback } from 'react';
import * as moment from 'moment';
import { isUrgent } from 'services/appointment';

function useAppointmentForm({ date, type, appointments }) {
  const selectedDayAppointments = useMemo(
    () => appointments?.filter(({ date }) => moment(date).isSame(date, 'day')),
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
    (minute, selectedHour) => {
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

      return selectedDayAppointments.some(({ date, duration }) => {
        const startDate = moment(date);
        const endDate = moment(startDate).add(duration, 'minutes');
        return newDate.isBetween(startDate, endDate, 'minutes', '[)');
      });
    },
    [date, selectedDayAppointments, type]
  );
  const sessionNotHaveEnoughTime = useCallback(
    ({ duration }, date) => {
      return selectedDayAppointments.some(
        ({ date: appDate, duration: DURATION }) => {
          const startDate = moment(date);
          const endDate = moment(startDate).add(duration, 'minutes');
          const startAppDate = moment(appDate);
          const endAppDate = moment(startAppDate).add(DURATION, 'minutes');
          const newDate = moment(appDate);
          return (
            newDate.isBetween(startDate, endDate, 'minutes', '[)') ||
            moment(date).isBetween(startAppDate, endAppDate, 'minutes', '[)')
          );
        }
      );
    },
    [selectedDayAppointments]
  );

  return useMemo(
    () => ({
      hideHours,
      disabledMinutes,
      sessionNotHaveEnoughTime,
    }),
    [disabledMinutes, hideHours, sessionNotHaveEnoughTime]
  );
}

export default useAppointmentForm;
