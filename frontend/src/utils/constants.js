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

export const RAW_PERMISSIONS = new Map([
  [
    'Appointment',
    [
      {
        name: 'List',
        action: 'list',
        subject: 'Appointment',
        visibility: false,
        level:null,
        specializations:[],
        branches:[],

      },
     /*  {
        name: 'List',
        action: 'list',
        subject: 'Appointment',
        level:'Branches',
        specializations:[],
        branches:[],
      }, */
      
       {
        name: 'Create',
        action: 'create',
        subject: 'Appointment',
        visibility: false,
        level:null,
        specializations:[],
        branches:[],
      },
      /*
      {
        name: 'Reschedule',
        action: 'reschedule',
        subject: 'Appointment',
      },
      {
        name: 'Finish',
        action: 'finish',
        subject: 'Appointment',
      },
      {
        name: 'Cancel',
        action: 'cancel',
        subject: 'Appointment',
      },
      {
        name: 'Archive',
        action: 'archive',
        subject: 'Appointment',
      }, */
    ],
  ],
 /*  [
    'Patients',
    [
      {
        name: 'View',
        action: 'view',
        subject: 'Patient',
      },
    ],
  ],
  [
    'Accounting',
    [
      { name: 'View', action: 'view', subject: 'Accounting' },
      {
        name: 'Add Revenue',
        action: 'add_revenue',
        subject: 'Accounting',
      },
      {
        name: 'Add Expense',
        action: 'add_expense',
        subject: 'Accounting',
      },
      {
        name: 'Edit Revenue',
        action: 'edit_revenue',
        subject: 'Accounting',
      },
      {
        name: 'Edit Expense',
        action: 'edit_expense',
        subject: 'Accounting',
      },
      {
        name: 'Print',
        action: 'print',
        subject: 'Accounting',
      },
    ],
  ],
  [
    'Calendar',
    [
      {
        name: 'View',
        action: 'view',
        subject: 'Calendar',
      },
      {
        name: 'Create Event',
        action: 'create_event',
        subject: 'Calendar',
      },
    ],
  ],
  [
    'Inventory',
    [
      {
        name: 'View',
        action: 'view',
        subject: 'Inventory',
      },
      {
        name: 'Add item',
        action: 'add',
        subject: 'Inventory',
      },
      {
        name: 'View History',
        action: 'view_history',
        subject: 'Inventory',
      },
      {
        name: 'Define item',
        action: 'define',
        subject: 'Inventory',
      },
    ],
  ], */
 /*  ['Statistical Report', [{ name: 'View', action: 'view', subject: 'Report' }]], */
]);

export const PERMISSIONS = new Map(
  [...RAW_PERMISSIONS.entries()].map(([key, value]) => [
    key,
    value.map(v => ({ ...v, id: v.action + v.subject })),
  ])
);
