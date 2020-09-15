import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  NewPatient,
  NewAppointment,
  Calendar,
  TodayAppointment,
  Appointment,
  Appointments,
  ListPatients,
  Patient,
  ReportsContainer,
  ListViews,
  CreateView,
  ClinicInfo,
  StaticSettings,
  Snippets,
  ListUsers,
  UserPermissions,
  Profile,
} from 'components';
import CreateDefaultView from 'components/views/create-default-view';

function AppRouter() {
  return (
    <Switch>
      <Route path="/patients/new">
        <NewPatient />
      </Route>
      <Route path="/appointments/new">
        <NewAppointment />
      </Route>
      <Route path="/appointments/today">
        <TodayAppointment />
      </Route>
      <Route path="/appointments" exact>
        <Appointments />
      </Route>
      <Route path="/appointments/:appointmentId">
        <Appointment />
      </Route>
      <Route path="/patients" exact>
        <ListPatients />
      </Route>
      <Route path="/patients/:patientId">
        <Patient />
      </Route>
      <Route path="/calendar">
        <Calendar />
      </Route>
      <Route path="/reports">
        <ReportsContainer />
      </Route>
      <Route path="/views/new">
        <CreateView />
      </Route>
      <Route path="/views" exact>
        <ListViews />
      </Route>
      <Route path="/login">
        <Redirect to="/" />
      </Route>
      <Route path="/settings/clinic">
        <ClinicInfo />
      </Route>
      <Route path="/settings/static">
        <StaticSettings />
      </Route>
      <Route path="/snippets">
        <Snippets />
      </Route>
      <Route path="/permissions" exact>
        <ListUsers />
      </Route>
      <Route path="/permissions/:userId">
        <UserPermissions />
      </Route>
      <Route path="/init-default-view">
        <CreateDefaultView />
      </Route>
      <Route path="/me">
        <Profile />
      </Route>

      <Route path="" exact>
        <Redirect to="/appointments/today" />
      </Route>
    </Switch>
  );
}

export default AppRouter;
