import React from 'react';
import { Root, StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/platform';

import MainStackNavigator from './src/navigation/main-stack-navigation';
import useUserInfo from '@/hooks/fetch-user-info';
import { AppLoading } from 'expo';

export const AuthContext = React.createContext();

const Main = () => {
  const { onLoginSucceeded, isAuthenticated, isVerified } = useUserInfo();

  const authContext = React.useMemo(
    () => ({
      onSignIn: onLoginSucceeded,
    }),
    [onLoginSucceeded]
  );

  if (!isAuthenticated && !isVerified) {
    return <AppLoading />;
  }

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
