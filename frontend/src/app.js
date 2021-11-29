import React, { useEffect } from 'react';
import { Ability } from '@casl/ability';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Font } from '@react-pdf/renderer';
import useGlobalState from 'state';
import client from './apollo-client/client';
import 'rsuite/dist/styles/rsuite-default.css';
import * as R from 'ramda';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Root } from 'components';
import './state';

import './global-style.js';
import GlobalStyle from './global-style';
import lightTheme from 'styles/light';
import font from './fonts/Tajawal-Regular.ttf';

import { AbilityContext } from 'components/user/can/index';

export default function App() {
  useEffect(() => {
    Font.register({
      family: 'Tajawal',
      format: 'truetype',
      src: font,
    });
  }, []);

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
