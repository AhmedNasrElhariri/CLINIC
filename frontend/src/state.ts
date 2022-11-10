import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  user: null,
  editLane: false,
  lanes: [],
  activeViews: {},
  activePatientViews: {},
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
