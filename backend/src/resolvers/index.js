import * as fromQuery from './query';
import * as fromMutation from './mutation';
import * as fromSubscription from './subscription';

import * as fromAppointment from './appointment';
import * as fromPatient from './patient';
import * as fromAppointmentField from './appointment-field/';
import * as fromSnippet from './snippet';
import * as fromCustomResolvers from './custom-resolvers';
import * as formPatientSurgery from './patient-surgery';
// import * as formBranch from './branch';
import * as formSpecialty from './specialty';
import * as fromUser from './user';
import * as fromRole from './role';
import * as fromLab from './lab';
import * as fromImage from './image';
import * as fromCourse from './course';
import * as fromPayroll from './payroll-user';
import * as fromPayrollTransaction from './payroll-transaction';
import * as fromPermission from './permission';
import * as fromRevenue from './revenue';
import * as fromExpense from './expense';
import * as fromBankRevenue from './bankRevenue';
import * as fromInsuranceTransactions from './insuranceTransaction';
import * as fromBankExpense from './bankExpense';
import * as fromLabDefinition from './lab-definition';
import * as fromImageDefinition from './image-definition';
import * as fromSupplierAccount from './supplier-account';
import * as fromSupplierInvoiceTransaction from './supplierInvoiceTransaction';
import * as fromSessionDefination from './session-defination';
import * as fromInventoryItem from './inventoryItem';
export default {
  Query: fromQuery,
  Mutation: fromMutation,
  Subscription: fromSubscription,
  Appointment: fromAppointment,
  Patient: fromPatient,
  AppointmentField: fromAppointmentField,
  Snippet: fromSnippet,
  PatientSurgery: formPatientSurgery,
  // Branch: formBranch,
  Specialty: formSpecialty,
  User: fromUser,
  Role: fromRole,
  Lab: fromLab,
  Image: fromImage,
  PayrollUser: fromPayroll,
  PayrollTransaction: fromPayrollTransaction,
  Permission: fromPermission,
  ...fromCustomResolvers,
  Course: fromCourse,
  Revenue: fromRevenue,
  Expense: fromExpense,
  BankRevenue: fromBankRevenue,
  BankExpense: fromBankExpense,
  InsuranceTransaction: fromInsuranceTransactions,
  LabDefinition: fromLabDefinition,
  ImageDefinition: fromImageDefinition,
  SupplierAccount: fromSupplierAccount,
  SupplierInvoiceTransaction: fromSupplierInvoiceTransaction,
  SessionDefinition: fromSessionDefination,
  InventoryItem: fromInventoryItem,
};
