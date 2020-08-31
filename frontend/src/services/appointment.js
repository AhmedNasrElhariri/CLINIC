import * as R from 'ramda';
import moment from 'moment';
import { mapArrToChoices } from 'utils/misc';
import { isDateBefore } from 'utils/date';
import { filterPatientBy, filterPatients } from 'utils/patient';

const MAX_TIMESTAMP = 8640000000000000;

export const convertGroupFieldsToNavs = groups => {
  return groups.map(g => ({
    ...g,
    title: g.name,
    to: g.id,
    fields: g.fields,
  }));
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

export const filterAppointments = (appointments = [], filter) => {
  const filters = [filterByDate, filterByPatientNameOrPhoneNo, filterByType];
  return filters.reduce((app, fn) => fn(app, filter), appointments);
};

export const getAppointmentTypes = () => ['Examination', 'Followup'];

export const appointmentTypes = mapArrToChoices(getAppointmentTypes());

export const isArchived = appointment => appointment.status === 'Archived';

export const isScheduled = appointment => appointment.status === 'Scheduled';

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
