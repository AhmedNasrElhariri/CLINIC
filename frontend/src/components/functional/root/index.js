import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { ACTIVE_VIEW } from 'apollo-client/queries';
import { ACCESS_TOKEN } from 'utils/constants';
import * as R from 'ramda';

import { AppRouter, Login, Div } from 'components';
import {
  ContainerStyled,
  MainStyled,
  ContentStyled,
  LoginContainerStyled,
} from './style';
import Sidebar from 'components/layout/sidebar';
import Navbar from 'components/layout/navbar';
import useAuth from 'hooks/auth';
import useGlobalState from 'state';
import NewAppointment from 'components/appointments/new-appointment';
import Settings from 'components/functional/settings';

function Root() {
  const [openSettings, setOpenSettings] = useState(false);
  const [getView, { data }] = useLazyQuery(ACTIVE_VIEW);
  const { isVerified, isAuthenticated, setAuthenticated } = useAuth();

  const [_, setActiveView] = useGlobalState('activeView');

  useEffect(() => {
    if (isVerified && isAuthenticated) {
      getView();
    }
  }, [data, getView, isAuthenticated, isVerified]);

  useEffect(() => {
    const activeView = R.prop('activeView')(data);
    if (activeView) {
      setActiveView(activeView);
    }
  }, [data, setActiveView]);

  const onLoginSucceeded = useCallback(
    token => {
      localStorage.setItem(ACCESS_TOKEN, token);
      setAuthenticated(true);
    },
    [setAuthenticated]
  );

  const onLoginFailed = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
  }, [setAuthenticated]);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    window.location.reload();
  }, [setAuthenticated]);

  if (!isVerified) {
    return <div>Loading ...</div>;
  }

  return (
    <BrowserRouter>
      <ContainerStyled>
        {isAuthenticated ? (
          <>
            <Sidebar />
            <MainStyled>
              <Navbar
                onLogout={logout}
                onClickSettings={() => setOpenSettings(!openSettings)}
              />
              <ContentStyled>
                <AppRouter></AppRouter>
              </ContentStyled>
            </MainStyled>
            <NewAppointment />
            <Settings open={openSettings} onLogout={logout} />
          </>
        ) : (
          <>
            <Route path="/login">
              <LoginContainerStyled>
                <Login
                  onLoginSucceeded={onLoginSucceeded}
                  onLoginFailed={onLoginFailed}
                />
              </LoginContainerStyled>
            </Route>
            <Redirect to="/login"></Redirect>
          </>
        )}
      </ContainerStyled>
    </BrowserRouter>
  );
}

export default Root;
