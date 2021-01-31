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
  AdminContainer,
  ListViews,
  CreateView,
  ClinicInfo,
  StaticSettings,
  Snippets,
  ListUsers,
  UserPermissions,
  RolePermissions,
  Profile,
  InventoryPage,
  PatientSurgeriesContainer,
} from 'components';
import CreateDefaultView from 'components/views/create-default-view';
import ProtectedRoute from '../protected-route/index';

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

      <ProtectedRoute
        path="/appointments/:appointmentId"
        component={Appointment}
        action="view"
        subject="Appointment"
      />

      <Route path="/patients" exact>
        <ListPatients />
      </Route>

      <ProtectedRoute
        path="/patients/:patientId"
        component={Patient}
        action="view"
        subject="Patient"
      />

      <Route path="/calendar">
        <Calendar />
      </Route>
      <Route path="/reports">
        <ReportsContainer />
      </Route>
      <Route path="/admin">
        <AdminContainer />
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

      <ProtectedRoute
        path="/permissions"
        component={ListUsers}
        action="manage"
        subject="all"
        exact
      />
      <Route
        path="/permissions/role"
        component={RolePermissions}
        action="manage"
        subject="all"
        exact
      />
      <ProtectedRoute
        path="/permissions/:userId"
        component={UserPermissions}
        action="manage"
        subject="all"
        exact
      />

      <Route
        path="/surgeries"
        component={PatientSurgeriesContainer}
        action="manage"
        subject="all"
      />

      <Route path="/inventory">
        <InventoryPage />
      </Route>

      <Route path="/init-default-view">
        <CreateDefaultView />
      </Route>

      <Route path="/me">
        <Profile />
      </Route>

      <Route path="" exact>
        {/* <Redirect to="/appointments/today" /> */}
        <Redirect to="/admin" />
      </Route>
    </Switch>
  );
}

export default AppRouter;
