import * as R from 'ramda';
import moment from 'moment';

const filterBySurgery = (data, filter) => {
  const surgeryId = R.propOr(null, 'surgery')(filter);
  return data.filter(({ surgery: { id } }) => !surgeryId || id === surgeryId);
};

const filterByHospital = (data, filter) => {
  const hospitalId = R.propOr(null, 'hospital')(filter);
  return data.filter(
    ({ hospital: { id } }) => !hospitalId || id === hospitalId
  );
};
const filterByPatient = (data, filter) => {
  const patientId = R.propOr(null, 'patientId')(filter);
  return data.filter(({ patient: { id } }) => !patientId || id === patientId);
};
const filterByDate = (data, filter) => {
  const time = R.propOr([], 'time')(filter);
  const startOfDate = moment(time[0]).startOf('day').toDate();
  const endOfDate = moment(time[1]).endOf('day').toDate();
  return data.filter(
    ({ date }) =>
      time.length == 0 ||
      (moment(date).toDate() >= startOfDate &&
        moment(date).toDate() <= endOfDate)
  );
};

export const filterPatientSurgery = (patientSurgeries = [], filter) => {
  const filters = [
    filterBySurgery,
    filterByHospital,
    filterByPatient,
    filterByDate,
  ];
  return filters.reduce((data, fn) => fn(data, filter), patientSurgeries);
};
