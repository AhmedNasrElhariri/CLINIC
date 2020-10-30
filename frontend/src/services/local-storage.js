import { ACCESS_TOKEN } from 'utils/constants';
import { getSessions } from './clinic';

const CLINIC_KEY = 'current_clinic';

export const set = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export const get = key => JSON.parse(localStorage.getItem(key));

export const remove = key => localStorage.removeItem(key);

export const setCurrentClinic = clinic => {
  set(CLINIC_KEY, {
    ...clinic,
    sessions: getSessions(clinic),
  });
};

export const getCurrentClinic = val => get(CLINIC_KEY);

export const setUserToken = val => set(ACCESS_TOKEN, val);

export const removeUserToken = val => remove(ACCESS_TOKEN);

export const getToken = () => get(ACCESS_TOKEN);
