/******************       Widgets    *********************************/
export * from './widgets';

/******************       functional  *********************************/
export { default as Root } from './functional/root';
export { default as AppRouter } from './functional/router';
export { default as ShowIf } from './functional/show-if';

/******************       users    *********************************/
export { default as Login } from './user/login';
export { default as Logout } from './user/logout';

/******************       Appointment    *********************************/
export { default as NewAppointment } from './appointments/new-appointment';
export { default as TodayAppointment } from './appointments/today-appointments';
export { default as Appointment } from './appointments/appointment';
export { default as Calendar } from './appointments/calendar';
export { default as Appointments } from './appointments/appointments';
export { default as AdjustAppointment } from './appointments/adjust-appointment';

/******************       Patient    *********************************/
export { default as ListPatients } from './patients/list-patients';
export { default as NewPatient } from './patients/new-patient';
export { default as Patient } from './patients/patient';
export { default as PatientSummary } from './patients/summary';
export { default as PatientProgress } from './patients/progress';
export { default as PatientFilter } from './patients/filter';

/******************       Snippets    *********************************/
export { default as Snippets } from './snippets/snippets';
export { default as NewSnippet } from './snippets/new-snippet';
export { default as ListSnippets } from './snippets/list-snippets';

/******************       Printouts    *********************************/
export { default as AppointmentPrintout } from './printouts/appointment-printout';

/******************       Reports    *********************************/
export { default as Reports } from './reports/reports';

/******************       Views    *********************************/
export { default as ListViews } from './views/list-views';
export { default as CreateView } from './views/create-view';
export { default as EditView } from './views/edit-views';
export { default as ViewForm } from './views/view-form';
export { default as CreateDefaultView } from './views/create-default-view';

/******************     Settings    *********************************/
export { default as AppointmentSettings } from './settings/appointment';
export { default as StaticSettings } from './settings/static';

/******************     Layout    *********************************/
export { default as MainContainer } from './layout/main-container';
