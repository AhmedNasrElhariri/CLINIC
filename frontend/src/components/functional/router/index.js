import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  NewPatient,
  NewAppointment,
  Calendar,
  TodayAppointment,
  Appointment,
  Appointments,
  Patients,
  Patient,
  Reports,
  ListViews,
  CreateView,
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
        <Patients />
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
      <Route path="/init-default-view">
        <CreateDefaultView />
      </Route>
      <Route path="/login">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default AppRouter;
