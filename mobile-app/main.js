import React, { useEffect } from 'react';
import { Root, StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/platform';

import MainStackNavigator from './src/navigation/main-stack-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import useGlobalState from '@/state';
import useFetchClinics from '@/hooks/fetch-clinics';

export const AuthContext = React.createContext();

const Main = () => {
  const [__, setUserToken] = useGlobalState('userToken');
  const [___, setVerified] = useGlobalState('isVerified');
  useFetchClinics();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken != null) {
          setVerified(true);
        }
      } catch (e) {}
      setUserToken(userToken);
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      onSignIn: async token => {
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
        setVerified(true);
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Root>
        <StyleProvider style={getTheme(variables)}>
          <MainStackNavigator />
        </StyleProvider>
      </Root>
    </AuthContext.Provider>
  );
};

export default Main;
