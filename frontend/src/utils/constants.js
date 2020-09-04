export const ACCESS_TOKEN = 'access-token';

export const NUMBER_FIELD_TYPE = 'Number';
export const TEXT_FIELD_TYPE = 'Text';
export const LONG_TEXT_FIELD_TYPE = 'LongText';

export const STANDARD_DATE_FORMAT = 'DD-MM-YYYY';

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

export const DAYS = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI'];

export const RAW_PERMISSIONS = new Map([
  [
    'Appointment',
    [
      {
        name: 'View',
        action: 'view',
        subject: 'Appointment',
      },
      {
        name: 'Create',
        action: 'create',
        subject: 'Appointment',
      },
      {
        name: 'Delete',
        action: 'delete',
        subject: 'Appointment',
      },
      {
        name: 'Reschedule',
        action: 'reschedule',
        subject: 'Appointment',
      },
      {
        name: 'Close',
        action: 'close',
        subject: 'Appointment',
      },
      {
        name: 'Archive',
        action: 'archive',
        subject: 'Appointment',
      },
    ],
  ],
  [
    'Patients',
    [
      {
        name: 'View',
        action: 'view',
        subject: 'Patient',
      },
      {
        name: 'Create',
        action: 'create',
        subject: 'Patient',
      },
      {
        name: 'View history',
        action: 'viewHistory',
        subject: 'Patient',
      },
    ],
  ],
  [
    'Report',
    [
      { name: 'View', action: 'view', subject: 'Report' },
      {
        name: 'Print',
        action: 'print',
        subject: 'Report',
      },
    ],
  ],
]);

export const PERMISSIONS = new Map(
  [...RAW_PERMISSIONS.entries()].map(([key, value]) => [
    key,
    value.map(v => ({ ...v, id: v.action + v.subject })),
  ])
);


export const ACCOUNTING_VIEWS = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  YEAR: 'YEAR',
};