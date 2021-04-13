import * as R from 'ramda';
import moment from 'moment';
import { mapArrToChoices } from 'utils/misc';
import { isDateBefore } from 'utils/date';
import { filterPatientBy } from 'utils/patient';
import { APPT_STATUS, APPT_TYPE } from 'utils/constants';

const MAX_TIMESTAMP = 8640000000000000;

export const convertGroupFieldsToNavs = groups => {
  return groups.map(g => ({
    ...g,
    title: g.name,
    to: g.id,
    fields: g.fields,
  }));
};

export const normalizeDataWithGroups = (groups = [], data = []) => {
  const normalizedFieldsData = normalizeFieldsData(data);
  return groups.map(group => {
    return {
      ...group,
      fields: R.unnest(group.fields).reduce((obj, f) => {
        const appointmentField = normalizedFieldsData[f.id] || { field: {} };
        return {
          ...obj,
          [appointmentField.field.name]: appointmentField.value,
        };
      }, {}),
    };
  });
};

export const normalizeFieldsOfGroups = (groups, data = []) => {
  const normalizedFieldsData = normalizeFieldsData(data);
  const fields = groups.map(group => group.fields);

  return R.unnest(fields).reduce((obj, f) => {
    const appointmentField = normalizedFieldsData[f.id] || {
      value: '',
      field: f,
    };
    return { ...obj, [f.id]: appointmentField };
  }, {});
};

export const normalizeFieldsData = data => {
  return data.reduce((obj, f) => ({ ...obj, [f.field.id]: f }), {});
};

export const getFormInitValues = normFields => {
  return Object.keys(normFields).reduce((obj, id) => {
    const fieldData = normFields[id];
    const value = R.propOr('', 'value')(fieldData);
    return { ...obj, [id]: value };
  }, {});
};

export const mapFormValueToAppointmentData = (normFields, fromValue) => {
  return Object.keys(normFields).map(id => ({
    id: normFields[id].id,
    value: fromValue[id],
    fieldId: id,
  }));
};

const filterByDate = (appointments, filter) => {
  const { date } = filter;

  const start = R.propOr(new Date(null), '0')(date);
  const end = R.propOr(new Date(MAX_TIMESTAMP), '1')(date);

  return appointments.filter(app =>
    moment(app.date).isBetween(start, end, 'day', '[]')
  );
};

const filterByPatientNameOrPhoneNo = (appointments, filter) => {
  const text = R.propOr('', 'patient')(filter);

  return appointments.filter(app => filterPatientBy(text, app.patient));
};

const filterByType = (appointments, filter) => {
  const type = R.prop('type')(filter);

  return !type ? appointments : appointments.filter(app => app.type === type);
};

export const sortAppointments = R.sort(R.descend(R.prop('date')));

export const filterAppointments = (appointments = [], filter) => {
  const filters = [
    filterByDate,
    filterByPatientNameOrPhoneNo,
    filterByType,
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
    : appointments.filter(app => app.branchId === branch);
};

const filterByDoctor = (appointments, filter) => {
  const doctor = R.prop('doctor')(filter);

  return !doctor
    ? appointments
    : appointments.filter(app => app.userId === doctor);
};

const filterBySpecialty = (appointments, filter) => {
  const specialty = R.prop('specialty')(filter);

  return !specialty
    ? appointments
    : appointments.filter(app => app.specialtyId === specialty);
};

export const filterTodayAppointments = (appointments = [], filter) => {
  const filters = [filterByBranch, filterByDoctor, filterBySpecialty];
  return filters.reduce((app, fn) => fn(app, filter), appointments);
};

export const getSpecialtiesByBranchId = (specialties, branchId) => {
  return specialties.filter(s =>
    s.branches.some(b => [branchId].includes(b.id))
  );
};

export const getDoctorsBySpecialtyId = (doctors, specialtyId) => {
  return doctors.filter(d => d.specialty.id === specialtyId);
};

export const getAppointmentTypes = () => Object.values(APPT_TYPE);

export const appointmentTypes = mapArrToChoices(getAppointmentTypes());

export const isArchived = appointment =>
  appointment.status === APPT_STATUS.ARCHIVED;

export const isScheduled = appointment =>
  appointment.status === APPT_STATUS.SCHEDULED;

export const isScheduledOrArchived = appointment =>
  isScheduled(appointment) || isArchived(appointment);

export const canAjdust = appointment => {
  return (
    appointment.status === 'Scheduled' &&
    isDateBefore(new Date(), appointment.date)
  );
};

export const sortAppointmentsByDate = appointments => {
  return R.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())(
    appointments
  );
};

export const isUrgent = appointment => {
  return R.propEq('type', APPT_TYPE.Urgent)(appointment);
};

export const isSession = appointment => {
  return R.propEq('type', APPT_TYPE.Session)(appointment);
};

export const listable = appointment => {
  return !R.propEq('type', APPT_TYPE.Surgery)(appointment);
};

export const getCreatableApptTypes = () => {
  return Object.values(APPT_TYPE).filter(type => type !== APPT_TYPE.Surgery);
};
