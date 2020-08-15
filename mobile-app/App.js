import React from 'react';
import { AppLoading } from 'expo';
import { Root, StyleProvider } from 'native-base';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';

import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/platform';

import client from './src/apollo-client/client';
import MainStackNavigator from './src/navigation/main-stack-navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      SegoeUI: require('./assets/fonts/SegoeUI.ttf'),
      SegoeUIBold: require('./assets/fonts/SegoeUI-Bold.ttf'),
      SegoeUISemiBold: require('./assets/fonts/SegoeUI-Semibold.ttf'),
      SegoeUISemiLight: require('./assets/fonts/SegoeUI-Semilight.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        <Root>
          <StyleProvider style={getTheme(variables)}>
            <MainStackNavigator />
          </StyleProvider>
        </Root>
      </ApolloProvider>
    );
  }
}
