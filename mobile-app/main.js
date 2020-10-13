import React from 'react';
import { Root, StyleProvider } from 'native-base';
import { AppLoading } from 'expo';

import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/platform';

import MainStackNavigator from './src/navigation/main-stack-navigation';
import useUserInfo from '@/hooks/fetch-user-info';
import { AuthContext } from './main-context';
import useAuth from '@/hooks/auth';

const Main = () => {
  const { initializing, onLoginSucceeded } = useAuth();
  useUserInfo();

  const authContext = React.useMemo(
    () => ({
      onSignIn: onLoginSucceeded,
    }),
    [onLoginSucceeded]
  );

  // if (initializing) {
  //   return <AppLoading />;
  // }

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
