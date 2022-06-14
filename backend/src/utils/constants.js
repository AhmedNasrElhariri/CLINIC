export const EXMATION_STARTING_HOUR = 19;
export const EXMAINTATION_LENGTH = 15;
export const APP_SECRET = 'sdfsdf39f';
export const MAX_NUMBERAPPS = 5;
export const APPOINTMENTS_STATUS = Object.freeze({
  SCHEDULED: 'Scheduled',
  CANCELLED: 'Cancelled',
  MISSED: 'Missed',
  CHANGED: 'Changed',
  ARCHIVED: 'Archived',
  WAITING: 'Waiting',
});
export const ACCOUNTING_VIEWS = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  YEAR: 'YEAR',
  TIME_SLOT: 'TIME_SLOT',
};

export const COURSE_STATUS = Object.freeze({
  FINISHED: 'Finished',
  INPROGRESS: 'InProgress',
  EARLY_FINISHED: 'EarlyFinished',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
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

export const LEVEL = Object.freeze({
  ORGANIZATION: 'organization',
  BRANCH: 'branch',
  SPECIALTY: 'specialty',
  USER: 'user',
});

export const IMAGE_STATUS = Object.freeze({
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
  ViewBank_Accounting: 'ViewBank_Accounting',
  ViewInsurance_Accounting: 'ViewInsurance_Accounting',
  Print_Accounting: 'Print_Accounting',
  AddBankRevenue_Accounting: 'AddBankRevenue_Accounting',
  AddBankExpense_Accounting: 'AddBankExpense_Accounting',
  EditBankRevenue_Accounting: 'EditBankRevenue_Accounting',
  EditBankExpense_Accounting: 'EditBankExpense_Accounting',
  View_Calendar: 'View_Calendar',
  CreateEvent_Calendar: 'CreateEvent_Calendar',
  View_Inventory: 'View_Inventory',
  AddItem_Inventory: 'AddItem_Inventory',
  ViewHistory_Inventory: 'ViewHistory_Inventory',
  DefineItem_Inventory: 'DefineItem_Inventory',
  AddCustom_Inventory: 'AddCustom_Inventory',
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
});
