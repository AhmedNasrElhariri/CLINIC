export const ACCESS_TOKEN = 'access-token';

export const NUMBER_FIELD_TYPE = 'Number';
export const TEXT_FIELD_TYPE = 'Text';
export const LONG_TEXT_FIELD_TYPE = 'LongText';

export const STANDARD_DATE_FORMAT = 'DD-MM-YYYY';
export const FULL_DATE_FORMAT = 'hh:mm a';
export const FULL_DAY_FORMAT = 'DD-MM-YYYY hh:mm a';

export const FIELD_TYPES = [
  { label: 'Number', value: NUMBER_FIELD_TYPE },
  { label: 'Text', value: TEXT_FIELD_TYPE },
  { label: 'Text Area', value: LONG_TEXT_FIELD_TYPE },
];

export const MEDICAL_HISTORY_TYPES = Object.freeze({
  medical: 'Medical',
  family: 'Family',
  social: 'Social',
});

export const APPT_STATUS = Object.freeze({
  SCHEDUlEd: 'Scheduled',
  CANCELLED: 'Cancelled',
  MISSED: 'Missed',
  CHANGED: 'Changed',
  DONE: 'Done',
  ARCHIVED: 'Archived',
});

export const APPT_TYPE = Object.freeze({
  Examination: 'Examination',
  Followup: 'Followup',
  Urgent: 'Urgent',
  Session: 'Session',
  Surgery: 'Surgery',
});

export const MIN_EVENT_DURATION = 15;

export const MIN_EXAMINATION_DURATION = 5;

export const DAYS = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI'];

export const UNIT_OF_MEASURES = [
  { label: 'Per unit', value: 'PerUnit', shortcut: 'unit' },
  { label: 'Milligram', value: 'Milligram', shortcut: 'mg' },
  { label: 'Kilogram', value: 'Kilogram', shortcut: 'kg' },
  { label: 'Millimeter', value: 'Millimeter', shortcut: 'mm' },
  { label: 'Centimetre', value: 'Centimetre', shortcut: 'cm' },
  { label: 'Tablet', value: 'Tablet', shortcut: 'tablet' },
  { label: 'Stripe', value: 'Stripe', shortcut: 'stripe' },
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

export const RAW_PERMISSIONS = [
  {
    id: 1,
    subject: 'Appointment',
    name: 'List',
  },
  {
    id: 2,
    subject: 'Appointment',
    name: 'Create',
  },
  {
    id: 3,
    subject: 'Appointment',
    name: 'Reschedule',
  },
  {
    id: 4,
    subject: 'Appointment',
    name: 'Finish',
  },
  {
    id: 5,
    subject: 'Appointment',
    name: 'Cancel',
  },
  {
    id: 6,
    subject: 'Appointment',
    name: 'Archive',
  },
  {
    id: 7,
    subject: 'Patient',
    name: 'View',
  },
  {
    id: 8,
    subject: 'Accounting',
    name: 'View',
  },
  {
    id: 9,
    subject: 'Accounting',
    name: 'Add Revenue',
  },
  {
    id: 10,
    subject: 'Accounting',
    name: 'Add Expense',
  },
  {
    id: 11,
    subject: 'Accounting',
    name: 'Edit Revenue',
  },
  {
    id: 12,
    subject: 'Accounting',
    name: 'Edit Expense',
  },
  {
    id: 13,
    subject: 'Accounting',
    name: 'Print',
  },
  {
    id: 14,
    subject: 'Calendar',
    name: 'View',
  },
  {
    id: 15,
    subject: 'Calendar',
    name: 'Create Event',
  },

  {
    id: 16,
    subject: 'Inventory',
    name: 'View',
  },
  {
    id: 17,
    subject: 'Inventory',
    name: 'Add item',
  },
  {
    id: 18,
    subject: 'Inventory',
    name: 'View History',
  },
  {
    id: 19,
    subject: 'Inventory',
    name: 'Define item',
  },
];

// name: 'Create',
// action: 'create',
// subject: 'Appointment',
// visibility: false,
// level:null,
//   mappings: [],

// export const PERMISSIONS = new Map(
//   [...RAW_PERMISSIONS.entries()].map(([key, value]) => [
//     key,
//     value.map(v => ({ ...v, id: v.action + v.subject })),
//   ])
// );

export const PERMISSIONS = [];
