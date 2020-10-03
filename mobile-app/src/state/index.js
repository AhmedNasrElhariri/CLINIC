import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  init: true,
  isSignout: false,
  isVerified: false,
  isAuthenticated: false,
  userToken: null,
  user: null,
  currentClinic: {},
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
