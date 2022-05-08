import { useMemo, useCallback } from "react";
import * as moment from "moment";
import { isUrgent } from "../services/constants";

function useAppointmentForm({ date, type, appointments }) {
  const selectedDayAppointments = useMemo(
    () => appointments?.filter(({ date }) => moment(date).isSame(date, "day")),
    [appointments]
  );

  const hideHours = useCallback(
    (hours) => {
      const hourDate = moment(date).set({
        hours,
      });
      if (hourDate.isBefore(moment(), "hours")) {
        return true;
      }
      if (isUrgent({ type })) {
        return false;
      }
      return (
        selectedDayAppointments.filter((app) =>
          moment(app.date).isSame(hourDate, "hours")
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


      const isBeforeNow = newDate.isBefore(moment(), "minute");
      if (isBeforeNow) {
        return true;
      }

      return selectedDayAppointments.some(({ date, duration }) => {
        const startDate = moment(date);
        const endDate = moment(startDate).add(duration, "minutes");
        return newDate.isBetween(startDate, endDate, "minutes", "[)");
      });
    },
    [date, selectedDayAppointments, type]
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
