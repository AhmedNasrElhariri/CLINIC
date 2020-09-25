import React, { useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
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
import NewAppointment from 'components/appointments/new-appointment';
import { Can } from 'components/user/can';
import { Form, AutoComplete, Icon, InputGroup } from 'rsuite';

import { filterPatientBy } from 'utils/patient';
import useUserProfile from './fetch-user';

function Root() {
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

  if (!isVerified) {
    return <div>Loading ...</div>;
  }

  return (
    <ContainerStyled>
      {isAuthenticated ? (
        <>
          <Sidebar />
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
              renderSearch={() => (
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
              )}
            />
            <ContentStyled>
              <AppRouter></AppRouter>
            </ContentStyled>
          </MainStyled>
          <Can I="create" a="Appointment">
            <NewAppointment />
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
