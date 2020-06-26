import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  user: null,
  lanes: [],
  activeView: {},
  currentClinic: {},
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
