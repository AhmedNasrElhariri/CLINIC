import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  user: null,
  lanes: [],
  activeViews: {},
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
