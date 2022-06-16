import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewPatient = lazy(() =>
  import('../../../components/patients/new-patient')
);
const NewAppointment = lazy(() =>
  import('../../../components/appointments/new-appointment')
);
const Calendar = lazy(() =>
  import('../../../components/appointments/calendar')
);
const EmployeePayroll = lazy(() =>
  import('../../../components/payroll/employee-payroll')
);

const Appointment = lazy(() =>
  import('../../../components/appointments/appointment')
);
const Appointments = lazy(() =>
  import('../../../components/appointments/appointments')
);
const ListPatients = lazy(() =>
  import('../../../components/patients/list-patients')
);
const Patient = lazy(() => import('../../../components/patients/patient'));
const ReportsContainer = lazy(() =>
  import('../../../components/reports/reports-container')
);
const PermissionContainer = lazy(() =>
  import('../../../components/admin/admin-container')
);
const ListViews = lazy(() => import('../../../components/views/list-views'));
const CreateView = lazy(() => import('../../../components/views/create-view'));
const UpdateView = lazy(() => import('../../../components/views/update-view'));
const Configurations = lazy(() =>
  import('../../../components/settings/configurations')
);
const StaticSettings = lazy(() =>
  import('../../../components/settings/static')
);
const Snippets = lazy(() => import('../../../components/snippets/snippets'));
const Profile = lazy(() => import('../../../components/user/profile'));
const InventoryPage = lazy(() =>
  import('../../../components/inventory/inventory-page')
);
const PatientSurgeriesContainer = lazy(() =>
  import('../../../components/patient-surgery/patient-surgeries-container')
);
const ReportPrintout = lazy(() =>
  import('../../../components/report-printouts')
);
const ListPatientViews = lazy(() =>
  import('../../../components/patient-views/list-views')
);
const UpdatePatientView = lazy(() =>
  import('../../../components/patient-views/update-patient-view')
);
const EditPatientView = lazy(() =>
  import('../../../components/patient-views/edit-views')
);
const CreatePatientView = lazy(() =>
  import('../../../components/patient-views/create-view')
);
const Csv = lazy(() => import('../../../components/csv'));
const Payroll = lazy(() => import('../../../components/payroll'));
const Sales = lazy(() => import('../../../components/sales'));
const Courses = lazy(() => import('../../../components/courses'));
const SupplierAccountContainer = lazy(() =>
  import('../../supplier-account-container')
);
const SupplierAccount = lazy(() =>
  import('../../supplier-account-container/supplier-account')
);
const SupplierInvoice = lazy(() =>
import('../../supplier-account-container/supplier-account/invoice')
);
const TodayAppointment = lazy(() =>
  import('../../../components/appointments/today-appointments')
);
const CreateDefaultView = lazy(() =>
  import('../../../components/views/create-default-view')
);
// const {
//   NewPatient,
//   NewAppointment,
//   Calendar,
//   EmployeePayroll,
//   TodayAppointment,
//   Appointment,
//   Appointments,
//   ListPatients,
//   Patient,
//   ReportsContainer,
//   PermissionContainer,
//   ListViews,
//   CreateView,
//   UpdateView,
//   Configurations,
//   StaticSettings,
//   Snippets,
//   Profile,
//   InventoryPage,
//   PatientSurgeriesContainer,
//   ReportPrintout,
//   ListPatientViews,
//   UpdatePatientView,
//   EditPatientView,
//   CreatePatientView,
//   Csv,
//   Payroll,
//   Sales,
// } = lazy(() => import('../../../components/index'));

function AppRouter() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<div>{t('loading')}</div>}>
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
        <Route path="/payroll/:emplyeeID">
          <EmployeePayroll />
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
        <Route path="/permissions">
          <PermissionContainer />
        </Route>
        <Route path="/payroll">
          <Payroll />
        </Route>
        <Route path="/views/new">
          <CreateView />
        </Route>
        <Route path="/views/:viewId">
          <UpdateView />
        </Route>
        <Route path="/patient-views/new">
          <CreatePatientView />
        </Route>
        <Route path="/patient-views/:id">
          <UpdatePatientView />
        </Route>
        <Route path="/views" exact>
          <ListViews />
        </Route>
        <Route path="/patient-views" exact>
          <ListPatientViews />
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
        <Route path="/surgeries">
          <PatientSurgeriesContainer />
        </Route>
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
        <Route path="/sales">
          <Sales />
        </Route>
        <Route path="/courses">
          <Courses />
        </Route>
        <Route path="/supplier-account/:supplierId">
          <SupplierAccount />
        </Route>
        <Route path="/supplier-invoice/:supplierInvoiceId">
          <SupplierInvoice />
        </Route>
        <Route path="/supplier-account">
          <SupplierAccountContainer />
        </Route>
        {/* <Route path="/csv">
        <Csv />
      </Route> */}
        <Route path="" exact>
          <Redirect to="/appointments/today" />
          {/* <Redirect to="/admin" /> */}
          {/* <Redirect to="/permissions/role" /> */}
        </Route>
      </Switch>
    </Suspense>
  );
}

export default AppRouter;
