export const EXMATION_STARTING_HOUR = 19;
export const EXMAINTATION_LENGTH = 15;
export const APP_SECRET = 'sdfsdf39f';

export const APPOINTMENTS_STATUS = Object.freeze({
  SCHEDULED: 'Scheduled',
  CANCELLED: 'Cancelled',
  MISSED: 'Missed',
  CHANGED: 'Changed',
  ARCHIVED: 'Archived',
  DONE: 'Done',
  CLOSED: 'Closed',
});

export const APPOINTMENTS_TYPES = Object.freeze({
  Examination: 'Examination',
  Followup: 'Followup',
  Urgent: 'Urgent',
  Session: 'Session',
  Surgery: 'Surgery',
});

export const SUBJECTS = {
  ALL: 'all',
  APPOINTMENT: 'Appointment',
  PATIENT: 'Patient',
  REPORT: 'Report',
};

export const ACTIONS = {
  MANAGE: 'manage',
  VIEW: 'view',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

export const INVENTORY_OPERATION = {
  ADD: 'Add',
  SUBSTRACT: 'Substract',
};

export const POSITION = {
  Admin: 'Admin',
  Doctor: 'Doctor',
  Assistant: 'Assistant',
};

export const PERMISSION_LEVEL = Object.freeze({
  ORGANIZATION: 'Organization',
  BRANCH: 'Branch',
  SPECIALTY: 'Specialty',
  USER: 'User',
});
