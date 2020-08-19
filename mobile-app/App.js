import React from 'react';
import { AppLoading } from 'expo';

import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './src/apollo-client/client';
import Main from './main';

const App = () => {
  const [fontsLoaded] = useFonts({
    SegoeUI: require('./assets/fonts/SegoeUI.ttf'),
    SegoeUIBold: require('./assets/fonts/SegoeUI-Bold.ttf'),
    SegoeUISemiBold: require('./assets/fonts/SegoeUI-Semibold.ttf'),
    SegoeUISemiLight: require('./assets/fonts/SegoeUI-Semilight.ttf'),
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
