import React, { useState, useCallback } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Fab from 'components/appointments/new-appointment/fab';
import { AppRouter, Login, NewPatient } from 'components';
import { UserIcon, CalendarIcon} from 'components/icons/index';
import {
  ContainerStyled,
  MainStyled,
  ContentStyled,
  LoginContainerStyled,
} from './style';
import Sidebar from 'components/layout/sidebar';
import Navbar from 'components/layout/navbar';
import NewAppointment from 'components/appointments/new-appointment';
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

  // const renderSearch = useCallback(
  //   () => (
  //     <Form style={{ width: 276 }}>
  //       <InputGroup>
  //         <AutoComplete
  //           data={patients}
  //           value={searchValue}
  //           onChange={setSearchValue}
  //           filterBy={(val, item) => {
  //             return filterPatientBy(val, item, true);
  //           }}
  //           renderItem={item => {
  //             return item.name;
  //           }}
  //           onSelect={({ id }) => {
  //             history.push(`/patients/${id}`);
  //           }}
  //         />
  //         <InputGroup.Button>
  //           <Icon icon="search" />
  //         </InputGroup.Button>
  //       </InputGroup>
  //     </Form>
  //   ),
  //   [history, patients, searchValue]
  // );

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
      to: '/permissions',
      name: 'Permissions',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/example',
      name: 'Example',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/labs',
      name: 'Labs',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/test',
      name: 'Test',
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/uploadimage',
      name: 'Uploadimage',
      icon: <UserIcon width={11.8} height={14.1} />,
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
