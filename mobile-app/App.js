import React from 'react';
import { AppLoading } from 'expo';
import { Root } from 'native-base';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './src/apollo-client';
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
          <MainStackNavigator />
        </Root>
      </ApolloProvider>
    );
  }
}
