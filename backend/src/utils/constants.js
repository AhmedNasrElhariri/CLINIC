export const EXMATION_STARTING_HOUR = 19;
export const EXMAINTATION_LENGTH = 15;
export const APP_SECRET = 'sdfsdf39f';

export const APPOINTMENTS_STATUS = Object.freeze({
  SCHEDULED: 'Scheduled',
  CANCELLED: 'Cancelled',
  MISSED: 'Missed',
  CHANGED: 'Changed',
  ARCHIVED: 'Archived',
  WAITING: 'Waiting',
});

export const COURSE_STATUS = Object.freeze({
  FINISHED: 'Finished',
  INPROGRESS: 'InProgress',
  EARLY_FINISHED: 'EarlyFinished',
});
export const APPOINTMENTS_TYPES = Object.freeze({
  Examination: 'Examination',
  Followup: 'Followup',
  Course: 'Course',
  Urgent: 'Urgent',
  Session: 'Session',
  Surgery: 'Surgery',
});

export const SUBJECTS = Object.freeze({
  ALL: 'all',
  APPOINTMENT: 'Appointment',
  PATIENT: 'Patient',
  REPORT: 'Report',
});

export const LAB_STATUS = Object.freeze({
  DRAFT: 'Draft',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
});

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

export const PAYROLL_STATUS = Object.freeze({
  Open: 'Open',
  Close: 'Close',
});

export const PAYROLL_TRANSACTION_TYPE = Object.freeze({
  Commision: 'Commision',
  Advance: 'Advance',
  Incentive: 'Incentive',
  Deduction: 'Deduction',
  Salary: 'Salary',
});

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
});
