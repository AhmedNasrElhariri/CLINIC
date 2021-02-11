import React, { useState, useCallback } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Fab from 'components/appointments/new-appointment/fab';
import { AppRouter, Login } from 'components';
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

function Root() {
  const[ open , setOpen] = useState(false);
  const [patientModal, setPatientModal] = useState(false);
  const [type, setType] = useState(0);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const {
    clinics,
    currentClinic,
    clearNotifications,
    onLoginFailed,
    onLoginSucceeded,
    logout,
    isVerified,
    isAuthenticated,
    onSelectClinic,
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
    { to: '/appointments/today', name: `Today's Appointments` },
    { to: '/calendar', name: 'Calendar' },
    { to: '/appointments', name: 'Appointments' , extra:  <Fab obj={1} open={open} setOpen={setOpen}/>},
    { to: '/patients', name: 'Patients', extra:  <Fab obj={2} patientModal={patientModal} setPatientModal={setPatientModal} /> },
    { to: '/reports', name: 'Reports' },
    { to: '/surgeries', name: 'Surgeries' },
    { to: '/report-printouts', name: 'Report Printouts' },
    { to: '/permissions', name: 'Permissions' },
  
  ];

  return (
    <ContainerStyled>
      {isAuthenticated ? (
        <>
          <Sidebar items={items} />
          <MainStyled>
            <Navbar
              onLogout={logout}
              clinics={clinics}
              onSelectClinic={onSelectClinic}
              currentClinic={currentClinic}
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
          <Can I="create" a="Appointment">
            <NewAppointment open={open} setOpen={setOpen} patientModal={patientModal} setPatientModal={setPatientModal} />
          </Can>
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
