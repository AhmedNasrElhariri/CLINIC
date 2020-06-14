/******************       Widgets    *********************************/
export { H1, H2, H3, H4, H5, H6, Img, Div } from './widgets/html';
export { default as InputField } from './widgets/input-field';
export { default as CheckField } from './widgets/check-field';
export { default as CRTextInput } from './widgets/text-input';
export { default as CRNumberInput } from './widgets/number-input';
export { default as CRSelectInput } from './widgets/select-input';
export { default as CRButton } from './widgets/button';
export { default as CRDatePicker } from './widgets/date-picker';
export { default as CRTimePicker } from './widgets/time-picker';

/******************       functional  *********************************/
export { default as Root } from './functional/root';
export { default as AppRouter } from './functional/router';

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
export { default as Patients } from './patients/patients';
export { default as NewPatient } from './patients/new-patient';
export { default as Patient } from './patients/patient';
export { default as PatientHistory } from './patients/patient-history';
export { default as PatientProgress } from './patients/patient-progress';
export { default as PatientFilter } from './patients/patients-filter';

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
