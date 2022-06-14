import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  isAuthenticated: false,
  isVerified: false,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
