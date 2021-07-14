import * as R from 'ramda';
import moment from 'moment';

export const filterAppointments = (appointments = [], filter) => {
  const filters = [
    filterByBranch,
    filterByDoctor,
    filterBySpecialty,
  ];
  return filters.reduce((app, fn) => fn(app, filter), appointments);
};

const filterByBranch = (appointments, filter) => {
  const branch = R.prop('branch')(filter);
  return !branch
    ? appointments
    : appointments.filter(app => app.branch?.id === branch);
};

const filterByDoctor = (appointments, filter) => {
  const doctor = R.prop('doctor')(filter);

  return !doctor
    ? appointments
    : appointments.filter(app => app?.doctor?.id === doctor);
};

const filterBySpecialty = (appointments, filter) => {
  const specialty = R.prop('specialty')(filter);

  return !specialty
    ? appointments
    : appointments.filter(app => app.specialty?.id === specialty);
};

export const filterTodayAppointments = (appointments = [], filter) => {
  const filters = [filterByBranch, filterByDoctor, filterBySpecialty];
  return filters.reduce((app, fn) => fn(app, filter), appointments);
};

export const sortAppointmentsByDate = appointments => {
  return R.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())(
    appointments
  );
};
