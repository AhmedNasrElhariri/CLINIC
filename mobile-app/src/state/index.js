import { createGlobalState } from 'react-hooks-global-state';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  isLoading: true,
  isSignout: false,
  isVerified: false,
  userToken: null,
  user: null,
  currentClinic: {},
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
