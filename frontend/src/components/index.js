/******************       Admin    *********************************/
export { default as AdminContainer } from './admin/admin-container';
/******************       Branches    *********************************/
export { default as BranchesContainer } from './admin/branches/branches-container';
export { default as NewBranch } from './admin/branches/new-branch';
export { default as ListBranches } from './admin/branches/list-branches';
export { default as AddSpecialization } from './admin/branches/add-specialization';
export { default as AddDoctor } from './admin/branches/add-doctor';
/******************       Specializations    *********************************/
export { default as SpecializationsContainer } from './admin/specializations/specializations-container';
export { default as NewSpecialization } from './admin/specializations/new-specialization';
export { default as ListSpecializations } from './admin/specializations/list-specializations';
/******************       Users    *********************************/
export { default as UsersContainer } from './admin/users/users-container';
export { default as NewUser } from './admin/users/new-user';
export { default as Users } from './admin/users/list-users';

/******************       Widgets    *********************************/
export * from './widgets';

/******************       Functional  *********************************/
export { default as Root } from './functional/root';
export { default as AppRouter } from './functional/router';
export { default as ShowIf } from './functional/show-if';

/******************       users    *********************************/
export { default as Profile } from './user/profile';
export { default as Login } from './user/login';
export { default as Logout } from './user/logout';

/******************       Patient    *********************************/
export { default as ListPatients } from './patients/list-patients';
export { default as NewPatient } from './patients/new-patient';
export { default as Patient } from './patients/patient';
export { default as PatientSummary } from './patients/summary';
export { default as PatientProgress } from './patients/progress';
export { default as PatientFilter } from './patients/filter';
export { default as PatientInfo } from './patients/patient-info';

/******************       Appointment    *********************************/
export { default as NewAppointment } from './appointments/new-appointment';
export { default as TodayAppointment } from './appointments/today-appointments';
export { default as Appointment } from './appointments/appointment';
export { default as Calendar } from './appointments/calendar';
export { default as Appointments } from './appointments/appointments';
export { default as AdjustAppointment } from './appointments/adjust-appointment';

/******************       Snippets    *********************************/
export { default as Snippets } from './snippets/snippets';
export { default as NewSnippet } from './snippets/new-snippet';
export { default as ListSnippets } from './snippets/list-snippets';

/******************       Printouts    *********************************/
export { default as AppointmentPrintout } from './printouts/appointment-printout';

/******************       Reports    *********************************/
export { default as ReportsContainer } from './reports/reports-container';

/******************       Views    *********************************/
export { default as ListViews } from './views/list-views';
export { default as CreateView } from './views/create-view';
export { default as EditView } from './views/edit-views';
export { default as ViewForm } from './views/view-form';
export { default as CreateDefaultView } from './views/create-default-view';

/******************     Settings    *********************************/
export { default as ClinicInfo } from './settings/clinic';
export { default as StaticSettings } from './settings/static';

/******************     Layout    *********************************/
export { default as MainContainer } from './layout/main-container';

/******************     Accounting    *******************************/
export { default as AccountingContainer } from './accounting/accounting-container';

/******************     Permissions    *******************************/
export { default as ListUsers } from './permissions/list-users';
export { default as UserPermissions } from './permissions/user-permissions';
export { default as RolePermissions } from './permissions/role-permissions';


/******************     Inventory    *******************************/
export { default as InventoryPage } from './inventory/inventory-page';
