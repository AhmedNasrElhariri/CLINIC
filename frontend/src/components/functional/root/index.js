import React, { useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Fab from 'components/appointments/new-appointment/fab';
import UserAllowedViewsContext from '../../../services/allowed-views-context';
import useGlobalState from 'state';
import { AppRouter, Login, NewPatient } from 'components';
import { UserIcon, CalendarIcon } from 'components/icons';
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
import { Can } from 'components/user/can';
import { useModal } from 'hooks';
const initialvalues = {
  branchId: null,
};

function Root() {
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();
  const { visible: visblePatient, toggle: togglePatient } = useModal();
  const history = useHistory();
  const [formValue, setFormValue] = useState(initialvalues);
  const {
    clearNotifications,
    onLoginFailed,
    onLoginSucceeded,
    logout,
    isVerified,
    isAuthenticated,
    notifications,
    user: User,
  } = useUserProfile();

  const [user] = useGlobalState('user');
  const allowedViews = R.propOr([], 'allowedViews')(user);
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
      extra: (
        <Can I="Create" an="Appointment">
          <Fab open={visbleAppointment} onClick={toggleAppointment} />
        </Can>
      ),
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/patients',
      name: 'Patients',
      extra: (
        <Can I="Create" an="Patient">
          <Fab open={visblePatient} onClick={togglePatient} />
        </Can>
      ),
      icon: <UserIcon width={11.8} height={14.1} />,
    },

    {
      to: '/reports',
      name: 'Reports',
      icon: <UserIcon width={11.8} height={14.1} />,
    },

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
    {
      to: '/sales',
      name: 'Sales',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/permissions',
      name: 'Permissions',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
  ];

  if (!isVerified) {
    return <div>Loading ...</div>;
  }

  return (
    <UserAllowedViewsContext.Provider value={allowedViews}>
      <ContainerStyled>
        {isAuthenticated ? (
          <>
            <Sidebar items={items} />
            <MainStyled>
              <Navbar
                onLogout={logout}
                onClickAvatar={() => history.push('/me')}
                avatar={R.prop('avatar')(User)}
                notifications={notifications}
                onClear={clearNotifications}
                formValue={formValue}
                setFormValue={setFormValue}
              />
              <ContentStyled>
                <AppRouter></AppRouter>
              </ContentStyled>
            </MainStyled>
            <NewAppointment
              show={visbleAppointment}
              onHide={toggleAppointment}
            />
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
    </UserAllowedViewsContext.Provider>
  );
}

export default Root;
