export const ACCESS_TOKEN = 'access-token';

export const NUMBER_FIELD_TYPE = 'Number';
export const TEXT_FIELD_TYPE = 'Text';
export const LONG_TEXT_FIELD_TYPE = 'LongText';
export const RADIO_FIELD_TYPE = 'Radio';
export const CHECK_FIELD_TYPE = 'Check';
export const NESTED_SELECTOR_FIELD_TYPE = 'NestedSelector';

export const STANDARD_DATE_FORMAT = 'DD-MM-YYYY';
export const FULL_DATE_FORMAT = 'hh:mm a';
export const FULL_DAY_FORMAT = 'DD-MM-YYYY hh:mm a';

export const FIELD_TYPES = [
  { label: 'Number', value: NUMBER_FIELD_TYPE },
  { label: 'Text', value: TEXT_FIELD_TYPE },
  { label: 'Text Area', value: LONG_TEXT_FIELD_TYPE },
  { label: 'Radio', value: RADIO_FIELD_TYPE },
  { label: 'Check', value: CHECK_FIELD_TYPE },
  { label: 'Nested Selector', value: NESTED_SELECTOR_FIELD_TYPE },
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

export const ALL_CHOICE = 'All';

export const ACTIONS = Object.freeze({
  Create_Appointment: 'Create_Appointment',
  List_Appointment: 'List_Appointment',
  Reschedule_Appointment: 'Reschedule_Appointment',
  Finish_Appointment: 'Finish_Appointment',
  Cancel_Appointment: 'Cancel_Appointment',
  Archive_Appointment: 'Archive_Appointment',
  View_Patient: 'View_Patient',
  View_Accounting: 'View_Accounting',
  AddRevenue_Accounting: 'AddRevenue_Accounting',
  AddExpense_Accounting: 'AddExpense_Accounting',
  EditRevenue_Accounting: 'EditRevenue_Accounting',
  EditExpense_Accounting: 'EditExpense_Accounting',
  Print_Accounting: 'Print_Accounting',
  View_Calendar: 'View_Calendar',
  CreateEvent_Calendar: 'CreateEvent_Calendar',
  View_Inventory: 'View_Inventory',
  AddItem_Inventory: 'AddItem_Inventory',
  ViewHistory_Inventory: 'ViewHistory_Inventory',
  DefineItem_Inventory: 'DefineItem_Inventory',
  Create_Course: 'Create_Course',
  List_Price: 'List_Price',
  Create_Price: 'Create_Price',
  List_Session: 'List_Session',
  Create_Session: 'Create_Session',
});

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
