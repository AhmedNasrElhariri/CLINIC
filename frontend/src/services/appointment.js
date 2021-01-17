import * as R from 'ramda';
import moment from 'moment';
import { mapArrToChoices, mapArrWithIdsToChoices } from 'utils/misc';
import { isDateBefore } from 'utils/date';
import { filterPatientBy } from 'utils/patient';
import { APPT_TYPE } from '../utils/constants';

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
    filterBySpecialization,
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

const filterBySpecialization = (appointments, filter) => {
  const specialization = R.prop('specialization')(filter);

  return !specialization
    ? appointments
    : appointments.filter(app => app.specializationId === specialization);
};

export const filterTodayAppointments = (appointments = [], filter) => {
  const filters = [filterByBranch, filterByDoctor, filterBySpecialization];
  return filters.reduce((app, fn) => fn(app, filter), appointments);
};

export const getSpecializationsByBranchId = (specializations, branchId) => {
  return specializations.filter(s =>
    s.branches.some(b => [branchId].includes(b.id))
  );
};

export const specializationsTypes = (specializations, branchId) =>
  mapArrWithIdsToChoices(
    getSpecializationsByBranchId(specializations, branchId)
  );

export const getDoctorsBySpecializationId = (doctors, specializationId) => {
  return doctors.filter(d => d.specialization.id === specializationId);
};

export const doctorsTypes = (doctors, specializationId) =>
  mapArrWithIdsToChoices(
    getDoctorsBySpecializationId(doctors, specializationId)
  );

export const getAppointmentTypes = () => ['Examination', 'Followup'];

export const appointmentTypes = mapArrToChoices(getAppointmentTypes());

export const isDone = appointment => appointment.status === 'Done';

export const isArchived = appointment => appointment.status === 'Archived';

export const isScheduled = appointment => appointment.status === 'Scheduled';

export const isScheduledOrArchived = appointment =>
  isScheduled(appointment) || isArchived(appointment);

export const isScheduledOrDone = appointment =>
  isScheduled(appointment) || isDone(appointment);

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
