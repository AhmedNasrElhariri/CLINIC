import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import client from './apollo-client';
import 'rsuite/dist/styles/rsuite-default.css';

import { Root } from 'components';
import './state';

import './global-style.js';
import GlobalStyle from './global-style';
import lightTheme from 'styles/light';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <ThemeProvider theme={lightTheme}>
          <Root />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
