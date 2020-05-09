import useGlobalState from 'state';
import { ACCESS_TOKEN } from 'utils/constants';



export const onLoginSuccess = token => {
  localStorage.setItem(ACCESS_TOKEN, token);
  setAuthenticated(true);
};

export const onLoginFalied = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  setAuthenticated(false);
};
