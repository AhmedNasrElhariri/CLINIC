import React from 'react';
import { Ability } from '@casl/ability';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import client from './apollo-client/client';
import 'rsuite/dist/styles/rsuite-default.css';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Root } from 'components';
import './state';

import './global-style.js';
import GlobalStyle from './global-style';
import lightTheme from 'styles/light';

import { AbilityContext } from 'components/user/can/index';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AbilityContext.Provider
        value={new Ability()}
      >
        <ApolloProvider client={client}>
          <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </ThemeProvider>
        </ApolloProvider>
      </AbilityContext.Provider>
    </>
  );
}
