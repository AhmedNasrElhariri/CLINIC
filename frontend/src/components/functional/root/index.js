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
import { Can } from 'components/user/can';
import { Form, AutoComplete, Icon, InputGroup } from 'rsuite';
import useFetchPatients from 'hooks/fetch-patients';

import { filterPatientBy } from 'utils/patient';

function Root() {
  const history = useHistory();
  const [clinics, setClinics] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [getView, { data }] = useLazyQuery(ACTIVE_VIEW);
  const [getClinics, { data: clinicsList }] = useLazyQuery(MY_CLINICS);
  const { patients } = useFetchPatients();
  const {
    isVerified,
    isAuthenticated,
    setAuthenticated,
    updatePermissions,
  } = useAuth();

  const [_, setActiveView] = useGlobalState('activeView');
  const [user] = useGlobalState('user');
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
    ({ token, user: { permissions } }) => {
      localStorage.setItem(ACCESS_TOKEN, token);
      setAuthenticated(true);
      updatePermissions(permissions);
    },
    [setAuthenticated, updatePermissions]
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
              clinics={clinics}
              onSelectClinic={onSelectClinic}
              currentClinic={currentClinic}
              onClickAvatar={() => history.push('/me')}
              avatar={R.prop('avatar')(user)}
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
