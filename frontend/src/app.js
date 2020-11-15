import React from 'react';
import { Ability } from '@casl/ability';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Font } from '@react-pdf/renderer';

import client from './apollo-client/client';
import 'rsuite/dist/styles/rsuite-default.css';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Root } from 'components';
import './state';

import './global-style.js';
import GlobalStyle from './global-style';
import lightTheme from 'styles/light';
import printFont from 'fonts/Cairo-Regular.ttf';

import { AbilityContext } from 'components/user/can/index';

Font.register({ family: 'Cairo', src: printFont });

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AbilityContext.Provider value={new Ability()}>
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
