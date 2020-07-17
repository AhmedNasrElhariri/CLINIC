import React, { useEffect, useState, useCallback } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { ACTIVE_VIEW, MY_CLINICS } from 'apollo-client/queries';
import { ACCESS_TOKEN } from 'utils/constants';
import * as R from 'ramda';

import { AppRouter, Login } from 'components';
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
import Notifications from 'components/functional/notifications';

function Root() {
  const history = useHistory();
  const [openSettings, setOpenSettings] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [getView, { data }] = useLazyQuery(ACTIVE_VIEW);
  const [getClinics, { data: clinicsList }] = useLazyQuery(MY_CLINICS);
  const { isVerified, isAuthenticated, setAuthenticated } = useAuth();

  const [_, setActiveView] = useGlobalState('activeView');
  const [currentClinic, setCurrentClinic] = useGlobalState('currentClinic');

  useEffect(() => {
    if (isVerified && isAuthenticated) {
      getView();
      getClinics();
    }
  }, [data, getClinics, getView, isAuthenticated, isVerified]);

  useEffect(() => {
    const activeView = R.prop('activeView')(data);
    const clinics = R.prop('myClinics')(clinicsList);
    if (activeView) {
      setActiveView(activeView);
    }
    if (clinics) {
      setClinics(clinics);
      setCurrentClinic(R.path(['0'])(clinics));
    }
  }, [clinicsList, data, setActiveView, setCurrentClinic]);

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

  const onSelectClinic = clinic => {
    setCurrentClinic(clinic);
    history.push('/');
  };

  return (
    <ContainerStyled>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <MainStyled>
            <Navbar
              onLogout={logout}
              toggleSettings={() => {
                setOpenSettings(true);
                setOpenNotifications(false);
              }}
              toggleNotification={() => {
                setOpenNotifications(true);
                setOpenSettings(false);
              }}
              clinics={clinics}
              onSelectClinic={onSelectClinic}
              currentClinic={currentClinic}
            />
            <ContentStyled>
              <AppRouter></AppRouter>
            </ContentStyled>
          </MainStyled>
          <NewAppointment />
          {openSettings && (
            <Settings
              open={openSettings}
              onLogout={logout}
              onClose={() => setOpenSettings(false)}
            />
          )}
          {openNotifications && (
            <Notifications
              open={openSettings}
              onLogout={logout}
              onClose={() => setOpenNotifications(false)}
            />
          )}
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
  );
}

export default Root;
