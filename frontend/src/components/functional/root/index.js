import React, { useState, useCallback } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Fab from 'components/appointments/new-appointment/fab';
import { AppRouter, Login, NewPatient } from 'components';
import {
  ContainerStyled,
  MainStyled,
  ContentStyled,
  LoginContainerStyled,
} from './style';
import Sidebar from 'components/layout/sidebar';
import Navbar from 'components/layout/navbar';
import NewAppointment from 'components/appointments/new-appointment';
import { Can } from 'components/user/can';
import { Form, AutoComplete, Icon, InputGroup } from 'rsuite';

import { filterPatientBy } from 'utils/patient';
import useUserProfile from './fetch-user';
import useModal from 'hooks/use-model';

function Root() {
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();
  const { visible: visblePatient, toggle: togglePatient } = useModal();

  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const {
    clearNotifications,
    onLoginFailed,
    onLoginSucceeded,
    logout,
    isVerified,
    isAuthenticated,
    notifications,
    patients,
    user,
  } = useUserProfile();

  const renderSearch = useCallback(
    () => (
      <Form style={{ width: 276 }}>
        <InputGroup>
          <AutoComplete
            data={patients}
            value={searchValue}
            onChange={setSearchValue}
            filterBy={(val, item) => {
              return filterPatientBy(val, item, true);
            }}
            renderItem={item => {
              return item.name;
            }}
            onSelect={({ id }) => {
              history.push(`/patients/${id}`);
            }}
          />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
      </Form>
    ),
    [history, patients, searchValue]
  );

  if (!isVerified) {
    return <div>Loading ...</div>;
  }
  const items = [
    {
      to: '/appointments/today',
      name: `Today's Appointments`,
      icon: <Icon icon="file" size="lg" fixedWidth />,
    },
    {
      to: '/calendar',
      name: 'Calendar',
      icon: <Icon icon="calendar" size="lg" fixedWidth />,
    },
    {
      to: '/appointments',
      name: 'Appointments',
      extra: <Fab open={visbleAppointment} onClick={toggleAppointment} />,
      icon: <Icon icon="user" size="lg" fixedWidth />,
    },
    {
      to: '/patients',
      name: 'Patients',
      extra: <Fab open={visblePatient} onClick={togglePatient} />,
      icon: <Icon icon="user" size="lg" fixedWidth />,
    },
    {
      to: '/reports',
      name: 'Reports',
      icon: <Icon icon="bar-chart" size="lg" fixedWidth />,
    },
    {
      to: '/surgeries',
      name: 'Surgeries',
      icon: <Icon icon="bar-chart" size="lg" fixedWidth />,
    },
    {
      to: '/report-printouts',
      name: 'Report Printouts',
      icon: <Icon icon="bar-chart" size="lg" fixedWidth />,
    },
    {
      to: '/permissions',
      name: 'Permissions',
      icon: <Icon icon="bar-chart" size="lg" fixedWidth />,
    },
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
              renderSearch={renderSearch}
            />
            <ContentStyled>
              <AppRouter></AppRouter>
            </ContentStyled>
          </MainStyled>
          {/* <Can I="create" a="Appointment"> */}
          <NewAppointment show={visbleAppointment} onHide={toggleAppointment} />
          {/* </Can> */}
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
