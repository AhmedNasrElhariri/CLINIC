import * as R from 'ramda';

export const getSessions = clinic =>
  R.pipe(R.propOr([], 'sessions'), R.map(R.pick(['name', 'price'])))(clinic);

export const filterUpdatapleFields = clinic => {
  return {
    ...clinic,
    sessions: getSessions(clinic),
  };
};
