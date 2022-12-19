export const ACCESS_TOKEN = 'access-token';
export const SELECTED_BRANCH = 'selectedBranch';
export const SELECTED_SPECIALTY = 'selectedSpecialty';
export const SELECTED_DOCTOR = 'selectedDoctor';

export const NUMBER_FIELD_TYPE = 'Number';
export const TEXT_FIELD_TYPE = 'Text';
export const LONG_TEXT_FIELD_TYPE = 'LongText';
export const RADIO_FIELD_TYPE = 'Radio';
export const CHECK_FIELD_TYPE = 'Check';
export const NESTED_SELECTOR_FIELD_TYPE = 'NestedSelector';
export const SELECTOR_WITH_INPUT = 'SelectorWithInput';
export const SELECTOR = 'Selector';

export const STANDARD_DATE_FORMAT = 'DD-MM-YYYY';
export const FULL_DATE_FORMAT = 'hh:mm a';
export const FULL_DAY_FORMAT = 'DD-MM-YYYY hh:mm a';

export const FIELD_TYPES = [
  { label: 'Number', value: NUMBER_FIELD_TYPE },
  { label: 'Text', value: TEXT_FIELD_TYPE },
  { label: 'Text Area', value: LONG_TEXT_FIELD_TYPE },
  { label: 'Radio', value: RADIO_FIELD_TYPE },
  { label: 'Check', value: CHECK_FIELD_TYPE },
  { label: 'Selector With Input', value: SELECTOR_WITH_INPUT },
  { label: 'Nested Selector', value: NESTED_SELECTOR_FIELD_TYPE },
  { label: 'Selector', value: SELECTOR },
];

export const MEDICAL_HISTORY_TYPES = Object.freeze({
  medicine: 'Medicine',
  family: 'Family',
  social: 'Social',
});

export const APPT_STATUS = Object.freeze({
  SCHEDULED: 'Scheduled',
  CANCELLED: 'Cancelled',
  MISSED: 'Missed',
  CHANGED: 'Changed',
  ARCHIVED: 'Archived',
  WAITING: 'Waiting',
});

export const APPT_TYPE = Object.freeze({
  Examination: 'Examination',
  Followup: 'Followup',
  Course: 'Course',
  Urgent: 'Urgent',
  Session: 'Session',
  Surgery: 'Surgery',
});

export const MIN_EVENT_DURATION = 15;

export const MIN_EXAMINATION_DURATION = 5;

export const DAYS = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI'];

export const UNIT_OF_MEASURES = [
  { name: 'Per unit', value: 'PerUnit', shortcut: 'unit' },
  { name: 'Milligram', value: 'Milligram', shortcut: 'mg' },
  { name: 'Kilogram', value: 'Kilogram', shortcut: 'kg' },
  { name: 'Millimeter', value: 'Millimeter', shortcut: 'mm' },
  { name: 'Centimetre', value: 'Centimetre', shortcut: 'cm' },
  { name: 'Tablet', value: 'Tablet', shortcut: 'tablet' },
  { name: 'Stripe', value: 'Stripe', shortcut: 'stripe' },
];

export const FORM_ACTIONS = Object.freeze({
  CREATE: 'CREATE',
  EDIT: 'EDIT',
});

export const ACCOUNTING_VIEWS = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  YEAR: 'YEAR',
  TIME_SLOT: 'TIME_SLOT',
};
export const ACCOUNT_OPTIONS = [
  { id: 'All', name: 'All', paramValue: ['revenues', 'expenses'] },
  { id: 'Revenue', name: 'Revenue', paramValue: ['revenues'] },
  { id: 'Expense', name: 'Expense', paramValue: ['expenses'] },
];
export const PERMISSION_LEVELS = Object.freeze({
  ORGNIZATION: 'Organization',
  BRANCH: 'Branch',
  SPECIALTY: 'Specialty',
  USER: 'User',
});

export const POSITIONS = Object.freeze({
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  ASSISTANT: 'Assistant',
});

export const CRUD = Object.freeze({
  CREATE: 'create',
  EDIT: 'edit',
});

export const LaneStatus = [
  { name: 'Static', value: 'Static' },
  { name: 'Dynamic', value: 'Dynamic' },
];

export const ALL_CHOICE = 'All';

export const ACTIONS = Object.freeze({
  Create_Appointment: 'Create_Appointment',
  List_Appointment: 'List_Appointment',
  Reschedule_Appointment: 'Reschedule_Appointment',
  Acc_Appointment: 'Acc_Appointment',
  Duplicates_Appointment: 'Duplicates_Appointment',
  Cancel_Appointment: 'Cancel_Appointment',
  Archive_Appointment: 'Archive_Appointment',
  View_Patient: 'View_Patient',
  View_Accounting: 'View_Accounting',
  AddRevenue_Accounting: 'AddRevenue_Accounting',
  AddExpense_Accounting: 'AddExpense_Accounting',
  EditRevenue_Accounting: 'EditRevenue_Accounting',
  EditExpense_Accounting: 'EditExpense_Accounting',
  Print_Accounting: 'Print_Accounting',
  ViewBank_Accounting: 'ViewBank_Accounting',
  AddBankRevenue_Accounting: 'AddBankRevenue_Accounting',
  AddBankExpense_Accounting: 'AddBankExpense_Accounting',
  EditBankRevenue_Accounting: 'EditBankRevenue_Accounting',
  EditBankExpense_Accounting: 'EditBankExpense_Accounting',
  ViewInsurance_Accounting: 'ViewInsurance_Accounting',
  // View_Calendar: 'View_Calendar',
  // CreateEvent_Calendar: 'CreateEvent_Calendar',
  View_Inventory: 'View_Inventory',
  AddItem_Inventory: 'AddItem_Inventory',
  ViewHistory_Inventory: 'ViewHistory_Inventory',
  DefineItem_Inventory: 'DefineItem_Inventory',
  AddCustom_Inventory: 'AddCustom_Inventory',
  Create_Course: 'Create_Course',
  Create_SessionDefinition: 'Create_SessionDefinition',
  Create_Hospital: 'Create_Hospital',
  Create_Surgery: 'Create_Surgery',
  View_Payroll: 'View_Payroll',
  CreateCommission_Payroll: 'CreateCommission_Payroll',
  CreateDeduction_Payroll: 'CreateDeduction_Payroll',
  CreateIncentives_Payroll: 'CreateIncentives_Payroll',
  CreateAdvance_Payroll: 'CreateAdvance_Payroll',
  CreatePayslips_Payroll: 'CreatePayslips_Payroll',
  Define_Sales: 'Define_Sales',
  Create_Sales: 'Create_Sales',
  View_Sales: 'View_Sales',
  Create_Patient: 'Create_Patient',
  CreateSocialReport_Patient: 'CreateSocialReport_Patient',
  CreateAreaReport_Patient: 'CreateAreaReport_Patient',
  ViewSessions_Patient: 'ViewSessions_Patient',
  ViewLabs_Patient: 'ViewLabs_Patient',
  ViewImages_Patient: 'ViewImages_Patient',
  DeleteImages_Patient: 'DeleteImages_Patient',
  ViewCourses_Patient: 'ViewCourses_Patient',
  ViewSessionsPulses_Patient: 'ViewSessionsPulses_Patient',
  GenerateMonthly_PulsesReport: 'GenerateMonthly_PulsesReport',
  GenerateDaily_PulsesReport: 'GenerateDaily_PulsesReport',
  View_Medicine: 'View_Medicine',
  View_Permission: 'View_Permission',
  ViewFilters_Accounting: 'ViewFilters_Accounting',
  ViewHistory_Patient: 'ViewHistory_Patient',
  ViewDental_Patient: 'ViewDental_Patient',
  ViewFaseOperation_Patient: 'ViewFaseOperation_Patient',
  ViewProgress_Patient: 'ViewProgress_Patient',
  ViewPatientInformationCreation_Patient:
    'ViewPatientInformationCreation_Patient',
  ViewCoupons_Patient: 'ViewCoupons_Patient',
  ViewPatientRevenue_Patient: 'ViewPatientRevenue_Patient',
  ViewPatientInfo_Patient: 'ViewPatientInfo_Patient',
  ViewSurgeries_Patient: 'ViewSurgeries_Patient',
  View_SupplierAccount: 'View_SupplierAccount',
  ViewDynamicViews_CurrentAppointment: 'ViewDynamicViews_CurrentAppointment',
  ViewNotes_CurrentAppointment: 'ViewNotes_CurrentAppointment',
  ViewImages_CurrentAppointment: 'ViewImages_CurrentAppointment',
  DeleteImages_CurrentAppointment: 'DeleteImages_CurrentAppointment',
});

export const ACTIONS_ORGANZATIONONLY = [
  'Acc_Appointment',
  'Cancel_Appointment',
  'Archive_Appointment',
  'View_Patient',
  'Print_Accounting',
  'ViewHistory_Inventory',
  'DefineItem_Inventory',
  'Create_SessionDefinition',
  'View_Payroll',
  'CreateCommission_Payroll',
  'CreateDeduction_Payroll',
  'CreateIncentives_Payroll',
  'CreateAdvance_Payroll',
  'CreatePayslips_Payroll',
  'Create_Patient',
  'CreateSocialReport_Patient',
  'CreateAreaReport_Patient',
  'ViewSessions_Patient',
  'ViewLabs_Patient',
  'ViewImages_Patient',
  'DeleteImages_Patient',
  'ViewCourses_Patient',
  'ViewSessionsPulses_Patient',
  'GenerateMonthly_PulsesReport',
  'GenerateDaily_PulsesReport',
  'View_Permission',
  'ViewFilters_Accounting',
  'ViewHistory_Patient',
  'ViewDental_Patient',
  'ViewFaseOperation_Patient',
  'ViewProgress_Patient',
  'ViewPatientInformationCreation_Patient',
  'ViewCoupons_Patient',
  'ViewPatientRevenue_Patient',
  'ViewPatientInfo_Patient',
  'ViewSurgeries_Patient',
  'View_SupplierAccount',
  'ViewDynamicViews_CurrentAppointment',
  'ViewNotes_CurrentAppointment',
  'ViewImages_CurrentAppointment',
  'DeleteImages_CurrentAppointment',
];

export const LAB_STATUS = Object.freeze({
  DRAFT: 'Draft',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
});

export const IMAGE_STATUS = Object.freeze({
  DRAFT: 'Draft',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
});
export const loggingModels = [
  {
    key: 'Revenue/Acc',
    value: { model: 'Revenue', tagName: 'revenue from appointment' },
  },
  {
    key: 'Expense/Acc',
    value: { model: 'Expense', tagName: 'expense from appointment' },
  },
  {
    key: 'BankRevenue/Acc',
    value: { model: 'BankRevenue', tagName: 'revenue from appointment' },
  },
  {
    key: 'BankExpense/Acc',
    value: { model: 'BankExpense', tagName: 'revenue from appointment' },
  },
  {
    key: 'Add - Edit Revenue/Cash',
    value: { model: 'Revenue', tagName: 'revenue from user' },
  },
  {
    key: 'Add - Edit Revenue/Visa',
    value: { model: 'BankRevenue', tagName: 'revenue from user' },
  },
];
