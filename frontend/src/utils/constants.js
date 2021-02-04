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
export const Allergies = ['Check1', 'Check2', 'Check3', 'Check4', 'Check5', 'Check6', 'Check7'];


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
      },
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
  ],
  ['Statistical Report', [{ name: 'View', action: 'view', subject: 'Report' }]],
]);

export const PERMISSIONS = new Map(
  [...RAW_PERMISSIONS.entries()].map(([key, value]) => [
    key,
    value.map(v => ({ ...v, id: v.action + v.subject })),
  ])
);
export const Labs = ['SGPT(ALT)','SGOT(ALT)','HDL','LIQUID PROFILE','SGPT'];

export const appointmentHistory =[
  {
    "id": "bc3b7bd3-aec2-40f9-94f2-e762ace316a3",
    "type": "Examination",
    "date": "2020-10-07T00:40:43.473Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [
      {
        "id": "66d7e91c-41ca-4fd4-95c8-736f9642fae2",
        "value": "",
        "field": {
          "id": "055c8835-0a0d-45a7-9ce4-78fd7e002c1b",
          "name": "Weight",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "65c1b8d4-d132-4e9d-87da-d8b06e4f3cdf",
        "value": "",
        "field": {
          "id": "151dfecb-7672-4ee3-9bb0-fa181938a446",
          "name": "Pressure",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "fc584b32-46d2-4bd8-a37a-8d1f83551b70",
        "value": "",
        "field": {
          "id": "3893d964-b44e-4b49-afc5-62a5631f7f59",
          "name": "Prescription",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "696e1e54-df3d-429c-9730-6c6ac6ee1469",
        "value": "",
        "field": {
          "id": "44fa5437-3ed9-44a7-bbe2-c692b9d2ce38",
          "name": "Recommendations",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "2799678f-ccd7-4d29-9221-65c66249dcfe",
        "value": "",
        "field": {
          "id": "a2f1c7b6-b25c-41b2-a6a3-61caf0273d7a",
          "name": "Symptoms",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "e91df3e5-451f-4503-b085-b2756835414b",
        "value": "",
        "field": {
          "id": "b3574769-0550-40b9-aa22-c52f306e3ec5",
          "name": "Signs",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "e9cd9ebf-05b9-496d-858d-b3a26f7183a7",
        "value": "",
        "field": {
          "id": "be8e3a0a-1308-4191-9cb1-3676e5d0acfb",
          "name": "Glucose Level",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "e6edfc9d-012f-4164-8edb-8afefaaa27ee",
        "value": 100,
        "field": {
          "id": "e11adf5b-573f-4172-9c26-e5d9f4cfcad5",
          "name": "Height",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "2b78c37b-bc68-4ca2-9b4f-c13f7e5c5d0c",
        "value": "",
        "field": {
          "id": "e93ae0fa-24b0-49fa-a7f4-2111a6bf7377",
          "name": "Complain",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      }
    ],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "d8a0a6f8-1624-4a27-8669-ecc56dff00a3",
    "type": "Examination",
    "date": "2020-10-07T00:20:43.473Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "7d12f955-4d49-4fb8-9ff7-de41e0939eee",
    "type": "Examination",
    "date": "2020-10-08T23:10:57.159Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [
      {
        "id": "741b6497-45a9-40d9-b24f-8df1e755e1b5",
        "value": "140/60",
        "field": {
          "id": "0da945af-d496-48ab-be40-cb7973aebdd4",
          "name": "Pressure",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "8cffef93-8396-4c85-af1c-98e076070d10",
        "value": 55,
        "field": {
          "id": "38ad78f2-5443-42af-adf0-ea7c1a811935",
          "name": "Weight",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "87555950-2259-4e3e-9975-89f927ba01f7",
        "value": "",
        "field": {
          "id": "685922ea-4eb9-4f93-b6f6-092dbc1e4548",
          "name": "Symptoms",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "028f203b-0a37-45f5-98e8-739b66699b95",
        "value": 30,
        "field": {
          "id": "8e596006-ea96-4290-a603-7ef75fae5549",
          "name": "Glucose Level",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "1e23f298-27b4-4712-b88a-9e44a27351b0",
        "value": "re eyes",
        "field": {
          "id": "a8a9381a-5e50-4f50-8531-fa585d5df064",
          "name": "Signs",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "f9dc59fa-b719-45d6-a59d-78d8dad3ffda",
        "value": "ko7a and de2 tnafos",
        "field": {
          "id": "c5456978-6549-4fdb-9699-b408f775fce5",
          "name": "Complain",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "6430cb9e-d28e-40ad-8de9-fb2d69eb62a8",
        "value": "",
        "field": {
          "id": "c660fa10-27b7-4dc6-b315-48b7d852ce7b",
          "name": "Recommendations",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "791e7522-5ab8-4e06-b2e9-c4075a630865",
        "value": "",
        "field": {
          "id": "d827b975-9851-4fc9-9d47-f8fc9426273e",
          "name": "Prescription",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "4d9d8e9d-34b3-46f5-a026-5fd787e72e62",
        "value": 120,
        "field": {
          "id": "fbe46f97-7e1b-463f-8341-72046f09bbd9",
          "name": "Height",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      }
    ],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "49eca2ad-4f0b-4878-9351-61868e32d0c9",
    "type": "Session",
    "date": "2020-11-09T00:45:29.669Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "6f15945b-88a5-4887-8cf5-2851e7436616",
    "type": "Session",
    "date": "2020-11-16T02:35:41.470Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "c787ce1e-7dc9-462f-a7c5-6f517db3c95e",
    "type": "Examination",
    "date": "2020-11-15T19:15:00.000Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [
      {
        "id": "f95fc62a-13d9-4036-8e05-8ecf44e1c243",
        "value": "",
        "field": {
          "id": "055c8835-0a0d-45a7-9ce4-78fd7e002c1b",
          "name": "Weight",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "162624cf-d37d-4619-a279-6704bb90dd63",
        "value": "",
        "field": {
          "id": "151dfecb-7672-4ee3-9bb0-fa181938a446",
          "name": "Pressure",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "48448426-c443-4981-aa24-b41ba386f619",
        "value": "",
        "field": {
          "id": "3893d964-b44e-4b49-afc5-62a5631f7f59",
          "name": "Prescription",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "c49b80c3-fda1-428a-9225-81566023c963",
        "value": "",
        "field": {
          "id": "44fa5437-3ed9-44a7-bbe2-c692b9d2ce38",
          "name": "Recommendations",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "028d1faa-cf0d-4ace-8936-05621569c458",
        "value": "",
        "field": {
          "id": "a2f1c7b6-b25c-41b2-a6a3-61caf0273d7a",
          "name": "Symptoms",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "6a1f14dd-6407-43f6-a833-af02fa51d7a1",
        "value": "",
        "field": {
          "id": "b3574769-0550-40b9-aa22-c52f306e3ec5",
          "name": "Signs",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "cb6016aa-084f-4601-a6ca-796ff2b2a8ed",
        "value": "",
        "field": {
          "id": "be8e3a0a-1308-4191-9cb1-3676e5d0acfb",
          "name": "Glucose Level",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "3245a307-ae82-49f9-9426-4c1e0f6e6ed1",
        "value": "",
        "field": {
          "id": "e11adf5b-573f-4172-9c26-e5d9f4cfcad5",
          "name": "Height",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "7b8a7544-3189-4903-b6c1-b467d04cb2a1",
        "value": "",
        "field": {
          "id": "e93ae0fa-24b0-49fa-a7f4-2111a6bf7377",
          "name": "Complain",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      }
    ],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [
      {
        "id": "2ec17d6f-d6e3-48c4-8303-2d40ea3e8275",
        "caption": "",
        "images": [
          {
            "id": "0e3ff1b3-e145-4dea-8f71-6dfd7c24a8ab",
            "url": "/uploads/pMeGN4iyQ-Selection_024.png",
            "comment": null,
            "__typename": "File"
          }
        ],
        "__typename": "Collection"
      }
    ],
    "__typename": "Appointment"
  },
  {
    "id": "499f2da2-c7ab-49d6-b174-7e758c303a20",
    "type": "Session",
    "date": "2020-11-20T20:20:04.727Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [
      {
        "id": "1efa6ddb-94d2-403c-a49f-9538d1688369",
        "value": "",
        "field": {
          "id": "055c8835-0a0d-45a7-9ce4-78fd7e002c1b",
          "name": "Weight",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "c6ad73f5-7ffe-4be8-9a6d-ee4970caf5cd",
        "value": "",
        "field": {
          "id": "151dfecb-7672-4ee3-9bb0-fa181938a446",
          "name": "Pressure",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "e9629ae4-a050-4dac-9533-0fb283cbe249",
        "value": "",
        "field": {
          "id": "3893d964-b44e-4b49-afc5-62a5631f7f59",
          "name": "Prescription",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "06f13550-e91d-442c-9716-0abb9ca54169",
        "value": "",
        "field": {
          "id": "44fa5437-3ed9-44a7-bbe2-c692b9d2ce38",
          "name": "Recommendations",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "a72dbfcb-5e48-4676-ad6e-b9aa58e1132a",
        "value": "",
        "field": {
          "id": "a2f1c7b6-b25c-41b2-a6a3-61caf0273d7a",
          "name": "Symptoms",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "42b91ba0-4c67-45ea-8eff-dc6daf2b9973",
        "value": "",
        "field": {
          "id": "b3574769-0550-40b9-aa22-c52f306e3ec5",
          "name": "Signs",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "072c0759-e44f-4763-a474-2013bc14f745",
        "value": "",
        "field": {
          "id": "be8e3a0a-1308-4191-9cb1-3676e5d0acfb",
          "name": "Glucose Level",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "8c6a18a4-cc81-4bdb-8e1f-b990cbac6bfd",
        "value": "",
        "field": {
          "id": "e11adf5b-573f-4172-9c26-e5d9f4cfcad5",
          "name": "Height",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "81ffa33f-6013-4d8e-91c4-ba0d3e787bbb",
        "value": "",
        "field": {
          "id": "e93ae0fa-24b0-49fa-a7f4-2111a6bf7377",
          "name": "Complain",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      }
    ],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [
      {
        "id": "4d1a8b63-d64f-4b1d-b026-ebc3d6839d0b",
        "caption": "Hello ",
        "images": [
          {
            "id": "8227e1fc-fefe-41bb-aed9-574732d60cd5",
            "url": "/uploads/ESiFOOMUj-Selection_069.png",
            "comment": null,
            "__typename": "File"
          },
          {
            "id": "c555698e-25e1-435b-8892-0356fcb6e68d",
            "url": "/uploads/C4xuaiFpH-Selection_065.png",
            "comment": null,
            "__typename": "File"
          }
        ],
        "__typename": "Collection"
      }
    ],
    "__typename": "Appointment"
  },
  {
    "id": "2c0e65d9-7179-446a-8a99-2a2e6f03e0da",
    "type": "Examination",
    "date": "2020-11-20T20:15:04.727Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "63fca529-1f28-4e77-813d-d657cd06114b",
    "type": "Examination",
    "date": "2020-11-22T08:15:49.304Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "fe94169f-43dd-46ce-8601-03d6ac53c876",
    "type": "Examination",
    "date": "2020-11-22T13:05:49.626Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "11fdc2cb-350d-4126-889c-6588a2217984",
    "type": "Examination",
    "date": "2020-11-25T18:00:24.590Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "sdsdsdsdsds",
    "data": [
      {
        "id": "0dbed618-6199-457c-b800-41dff4215c9e",
        "value": 90,
        "field": {
          "id": "055c8835-0a0d-45a7-9ce4-78fd7e002c1b",
          "name": "Weight",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "b38d3e49-665c-433f-9c6a-e2533b54ff75",
        "value": "120/70",
        "field": {
          "id": "151dfecb-7672-4ee3-9bb0-fa181938a446",
          "name": "Pressure",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "bf565ed0-21b3-482e-a108-a16c4267019e",
        "value": "",
        "field": {
          "id": "3893d964-b44e-4b49-afc5-62a5631f7f59",
          "name": "Prescription",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "bee0c6e8-e066-48cd-ae03-6e70ad6b64d9",
        "value": "",
        "field": {
          "id": "44fa5437-3ed9-44a7-bbe2-c692b9d2ce38",
          "name": "Recommendations",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "081dc910-a6bb-40a0-9077-bdaa761fd88c",
        "value": "",
        "field": {
          "id": "a2f1c7b6-b25c-41b2-a6a3-61caf0273d7a",
          "name": "Symptoms",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "ba90c668-ce29-4c71-8cff-3c798d691c36",
        "value": "",
        "field": {
          "id": "b3574769-0550-40b9-aa22-c52f306e3ec5",
          "name": "Signs",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "22017e39-f73c-47c5-87fe-f947fdeefcaf",
        "value": 190,
        "field": {
          "id": "be8e3a0a-1308-4191-9cb1-3676e5d0acfb",
          "name": "Glucose Level",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "8918a196-a9a9-40ce-997d-f24c1e91295c",
        "value": 110,
        "field": {
          "id": "e11adf5b-573f-4172-9c26-e5d9f4cfcad5",
          "name": "Height",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "45b9000a-c4d1-47f0-9e20-fa2f90cf3458",
        "value": "كحة و سخونة",
        "field": {
          "id": "e93ae0fa-24b0-49fa-a7f4-2111a6bf7377",
          "name": "Complain",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      }
    ],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [
      {
        "id": "34fafcee-3f5e-4adb-9c2f-403164a6ff7f",
        "caption": "",
        "images": [
          {
            "id": "8e361f32-b114-42e2-afb1-ffd5e4e4c0bb",
            "url": "/uploads/KBt4xqQgz-Selection_069.png",
            "comment": null,
            "__typename": "File"
          }
        ],
        "__typename": "Collection"
      }
    ],
    "__typename": "Appointment"
  },
  {
    "id": "5439ee88-aa0c-4e78-8e85-7d25d2e97507",
    "type": "Examination",
    "date": "2021-01-03T17:15:13.045Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "31088031-e53f-4470-b580-c3c491446e28",
    "type": "Examination",
    "date": "2021-01-09T17:20:16.360Z",
    "labs": [],
    "status": "Closed",
    "notes": "سكر",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "9b3c3ec9-170d-4a3c-8ba9-46929dffdfb4",
    "type": "Examination",
    "date": "2021-01-09T18:20:54.028Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "65086194-cebc-4dff-bfd5-8903c17af75c",
    "type": "Examination",
    "date": "2021-01-09T20:20:34.769Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "4b23f913-9f6c-491d-a138-be6307b2d740",
    "type": "Examination",
    "date": "2021-01-14T19:05:16.097Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "20cad764-c349-49f9-886b-86fb852ecc59",
    "type": "Examination",
    "date": "2021-01-14T19:30:16.097Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [],
    "__typename": "Appointment"
  },
  {
    "id": "3029c238-a7a1-4c0c-8d32-92cb9d36dde6",
    "type": "Examination",
    "date": "2021-01-18T17:20:06.002Z",
    "labs": [],
    "status": "Closed",
    "notes": "",
    "prescription": "",
    "data": [
      {
        "id": "5bcb9134-130f-439e-8a66-6c442a60b78e",
        "value": 2132,
        "field": {
          "id": "2dc687a4-6c00-44e3-8be3-f5ff1c3b7e02",
          "name": "Height",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "a2804dc6-d3e9-4efe-a9d8-df1696e0d0f5",
        "value": 23,
        "field": {
          "id": "3aa5b8aa-8abe-4b42-826d-031e45589347",
          "name": "Weight",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "f088ebb4-d897-4f0a-b55e-422affb2659d",
        "value": "",
        "field": {
          "id": "3bc31055-6505-4c83-95fd-26414eba61cd",
          "name": "Glucose Level",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "ee3dd418-809f-4838-b049-3b6997166f28",
        "value": "",
        "field": {
          "id": "4a722be5-40fd-4535-97b1-d82127ba298d",
          "name": "Recommendations",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "8b9ee412-b03a-41fa-b5f4-6710205e3318",
        "value": "حمى\nسعالrrrr\nتعب فى الجسم",
        "field": {
          "id": "5b819c3b-9ffb-4cbd-a638-411ffffeb6b1",
          "name": "Complain",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "47232c20-b51d-4686-85a0-2ecd3ed0b6fd",
        "value": "",
        "field": {
          "id": "9c1c38ad-eaf2-4fcd-8b21-7d6fcde00a2e",
          "name": "Pressure",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "2659b816-1d26-4c79-ba6b-f986d0aa694b",
        "value": "",
        "field": {
          "id": "d16aa86e-ddbe-4b2a-8fe7-b5a9030d9fb3",
          "name": "Symptoms",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "1f915629-2642-4ba8-acdf-83cbe2ebab84",
        "value": "",
        "field": {
          "id": "e8e366e7-87b8-4c0a-abb1-1bc45034ace7",
          "name": "Signs",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      },
      {
        "id": "7e4bc43c-0055-4e21-b299-cb21d4291663",
        "value": "",
        "field": {
          "id": "f7db6924-0ec4-48c1-8ae7-704c071f999f",
          "name": "Prescription",
          "__typename": "Field"
        },
        "__typename": "AppointmentField"
      }
    ],
    "patient": {
      "id": "251c4faa-2e69-4ea0-a194-75376b6a5a0f",
      "name": "pateint one",
      "age": 37,
      "sex": "Male",
      "__typename": "Patient"
    },
    "collections": [
      {
        "id": "28cbb34a-4ae8-41cb-bbc6-4e4393804f41",
        "caption": "Album1 ",
        "images": [
          {
            "id": "96eb9a60-cbe1-406d-a721-79052a199cce",
            "url": "/uploads/RZCKa0ezY-Selection_001.png",
            "comment": null,
            "__typename": "File"
          }
        ],
        "__typename": "Collection"
      }
    ],
    "__typename": "Appointment"
  }
];