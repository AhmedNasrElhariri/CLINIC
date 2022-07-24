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
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

const initialvalues = {
  branchId: null,
  dir: 'rtl',
};

function Root() {
  const [formValue, setFormValue] = useState(initialvalues);
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();
  const { visible: visblePatient, toggle: togglePatient } = useModal();
  const history = useHistory();
  const { t } = useTranslation();

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
  const appointmentsName = t('appointments'),
    todayAppointmentsName = t('todayAppointments'),
    calenderName = t('calendar'),
    salesName = t('sales'),
    reportsName = t('reports'),
    patientsName = t('patients'),
    surgeriesName = t('surgeries'),
    reportPrintoutName = t('reportsPrintout'),
    permissionsName = t('permissions'),
    coursesName = t('courses'),
    inventory = t('inventory'),
    supplierAccount = t('supplierAccount');
  const items = [
    {
      to: '/appointments/today',
      name: todayAppointmentsName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    // {
    //   to: '/calendar',
    //   name: 'Calendar',
    //   icon: <CalendarIcon width={11.8} height={14.1} />,
    // },
    {
      to: '/appointments',
      name: appointmentsName,
      extra: (
        <Can I="Create" an="Appointment">
          <Fab open={visbleAppointment} onClick={toggleAppointment} />
        </Can>
      ),
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/patients',
      name: patientsName,
      extra: (
        <Can I="Create" an="Patient">
          <Fab open={visblePatient} onClick={togglePatient} />
        </Can>
      ),
      icon: <UserIcon width={11.8} height={14.1} />,
    },

    {
      to: '/reports',
      name: reportsName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },

    {
      to: '/surgeries',
      name: surgeriesName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/report-printouts',
      name: reportPrintoutName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/sales',
      name: salesName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/courses',
      name: coursesName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/supplier-account',
      name: supplierAccount,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/inventory',
      name: inventory,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
    {
      to: '/permissions',
      name: permissionsName,
      icon: <UserIcon width={11.8} height={14.1} />,
    },
  ];

  if (!isVerified) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div dir={formValue.dir}>
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
                  user={user}
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
    </div>
  );
}

export default Root;
