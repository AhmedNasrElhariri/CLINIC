import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  user: null,
  lanes: [],
  activeView: {},
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
