import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
  Login,
} from 'components';

function AppRouter() {
  return (
    <Router>
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
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login"></Redirect>
      </Switch>
    </Router>
  );
}

export default AppRouter;
