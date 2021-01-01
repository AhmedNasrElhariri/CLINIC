import * as R from 'ramda';

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

export const filterPatientSurgery = (patientSurgeries = [], filter) => {
  const filters = [filterBySurgery, filterByHospital];
  return filters.reduce((data, fn) => fn(data, filter), patientSurgeries);
};
