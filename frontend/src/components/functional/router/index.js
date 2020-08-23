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
  Reports,
  ListViews,
  CreateView,
  AppointmentSettings,
  StaticSettings,
  Snippets,
  AccountingContainer,
  ListUsers,
  UserPermissions,
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
        <Reports />
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
      <Route path="/settings/appointment">
        <AppointmentSettings />
      </Route>
      <Route path="/settings/static">
        <StaticSettings />
      </Route>
      <Route path="/snippets">
        <Snippets />
      </Route>
      <Route path="/settings/accounting">
        <AccountingContainer />
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
    </Switch>
  );
}

export default AppRouter;
