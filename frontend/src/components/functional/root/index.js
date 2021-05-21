import React, { useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Fab from 'components/appointments/new-appointment/fab';
import { AppRouter, Login, NewPatient } from 'components';
import { UserIcon, CalendarIcon } from 'components/icons/index';
import {
  ContainerStyled,
  MainStyled,
  ContentStyled,
  LoginContainerStyled,
} from './style';
import Sidebar from 'components/layout/sidebar';
import Navbar from 'components/layout/navbar';
import NewAppointment from 'components/appointments/new-appointment';
import useUserProfile from './fetch-user';

import { useAuth, useModal } from 'hooks';

function Root() {
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();
  const { visible: visblePatient, toggle: togglePatient } = useModal();
  const history = useHistory();

  const {
    clearNotifications,
    onLoginFailed,
    onLoginSucceeded,
    logout,
    isVerified,
    isAuthenticated,
    notifications,
    user,
  } = useUserProfile();

  const { isOrAssistant } = useAuth();

  if (!isVerified) {
    return <div>Loading ...</div>;
  }

  const items = [
    {
      to: '/appointments/today',
      name: `Today's Appointments`,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/calendar',
      name: 'Calendar',
      icon: <CalendarIcon width={11.8} height={14.1} />,
    },
    {
      to: '/appointments',
      name: 'Appointments',
      extra: <Fab open={visbleAppointment} onClick={toggleAppointment} />,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/patients',
      name: 'Patients',
      extra: <Fab open={visblePatient} onClick={togglePatient} />,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    ...(isOrAssistant
      ? [
          {
            to: '/reports',
            name: 'Reports',
            icon: <UserIcon width={11.8} height={14.1} />,
          },
        ]
      : []),
    {
      to: '/surgeries',
      name: 'Surgeries',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/report-printouts',
      name: 'Report Printouts',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    ...(isOrAssistant
      ? [
          {
            to: '/sales',
            name: 'Sales',
            icon: <UserIcon width={11.8} height={14.1} />,
          },
        ]
      : []),
  ];

  return (
    <ContainerStyled>
      {isAuthenticated ? (
        <>
          <Sidebar items={items} />
          <MainStyled>
            <Navbar
              onLogout={logout}
              onClickAvatar={() => history.push('/me')}
              avatar={R.prop('avatar')(user)}
              notifications={notifications}
              onClear={clearNotifications}
            />
            <ContentStyled>
              <AppRouter></AppRouter>
            </ContentStyled>
          </MainStyled>
          <NewAppointment show={visbleAppointment} onHide={toggleAppointment} />
          <NewPatient show={visblePatient} onHide={togglePatient} />
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
