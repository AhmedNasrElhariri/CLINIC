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
  PermissionContainer,
  ListViews,
  CreateView,
  Configurations,
  StaticSettings,
  Snippets,
  Profile,
  InventoryPage,
  PatientSurgeriesContainer,
  ReportPrintout,
  Example,
  Csv,
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

      <Route path="/appointments/:appointmentId" component={Appointment} />
      <Route path="/patients" exact>
        <ListPatients />
      </Route>

      <Route path="/patients/:patientId" component={Patient} />

      <Route path="/calendar">
        <Calendar />
      </Route>
      <Route path="/reports">
        <ReportsContainer />
      </Route>
      <Route path="/permissions">
        <PermissionContainer />
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
      <Route path="/settings/configurations">
        <Configurations />
      </Route>
      <Route path="/settings/static">
        <StaticSettings />
      </Route>
      <Route path="/snippets">
        <Snippets />
      </Route>

      <Route
        path="/surgeries"
        component={PatientSurgeriesContainer}
        action="manage"
        subject="all"
      />
      <Route path="/report-printouts">
        <ReportPrintout />
      </Route>
      <Route path="/inventory">
        <InventoryPage />
      </Route>

      <Route path="/init-default-view">
        <CreateDefaultView />
      </Route>

      <Route path="/me">
        <Profile />
      </Route>
      <Route path="/example">
        <Example />
      </Route>
      {/* <Route path="/test">
        <>
          <Patient />
          <Test />
        </>
      </Route> */}
      <Route path="/csv">
        <Csv />
      </Route>
      <Route path="" exact>
        <Redirect to="/appointments/today" />
        {/* <Redirect to="/admin" /> */}
        {/* <Redirect to="/permissions/role" /> */}
      </Route>
    </Switch>
  );
}

export default AppRouter;
