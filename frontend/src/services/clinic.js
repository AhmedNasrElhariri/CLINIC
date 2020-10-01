import * as R from 'ramda';

export const filterUpdatapleFields = val => {
  return {
    ...val,
    sessions: R.map(R.pick(['name', 'price']))(val.sessions),
  };
};
