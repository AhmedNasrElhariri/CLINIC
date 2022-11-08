import "antd/dist/antd.variable.min.css";
import { ConfigProvider } from "antd";
import "./styles/App.css";
import { Provider } from "react-redux";

import React, { useEffect } from "react";
import { Ability } from "@casl/ability";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Font } from "@react-pdf/renderer";
import client from "./apollo-client/client";
import { Root } from "components";
import GlobalStyle from "./global-style";
import lightTheme from "styles/light";
import "rsuite/dist/styles/rsuite-default.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "./state";
import "./global-style.js";
import { AbilityContext } from "components/user/can/index";
import { get } from "services/local-storage";
import { store } from "redux-store/store";
// import { StyleSheetManager } from 'styled-components';
// import rtlPlugin from 'stylis-plugin-rtl';

ConfigProvider.config({
  theme: {
    primaryColor: "#51c6f3",
  },
});

export default function App() {
  useEffect(() => {
    Font.register({
      family: "Tajawal",
      format: "truetype",
      src: "./fonts/Tajawal-Regular.ttf",
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        <ConfigProvider>
          <GlobalStyle />
          <AbilityContext.Provider value={new Ability()}>
            <ApolloProvider client={client}>
              <ThemeProvider theme={{ ...lightTheme, direction: get("dir") }}>
                <BrowserRouter>
                  <Root />
                </BrowserRouter>
              </ThemeProvider>
            </ApolloProvider>
          </AbilityContext.Provider>
        </ConfigProvider>
      </Provider>
    </>
  );
}
