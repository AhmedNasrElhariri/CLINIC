import * as fromQuery from './query';
import * as fromMutation from './mutation';
import * as fromSubscription from './subscription';

import * as fromAppointment from './appointment';
import * as fromPatient from './patient';
import * as fromAppointmentField from './appointment-field/';
import * as fromSnippet from './snippet';
import * as fromCustomResolvers from './custom-resolvers';
import * as formPatientSurgery from './patient-surgery';
import * as formBranch from './branch';
import * as formSpecialty from './specialty';
import * as fromUser from './user';
import * as fromRole from './role';
import * as fromLab from './lab';
import * as fromImage from './image';
import * as fromPayRoll from './payRollUser';
import * as fromPayRollTransaction from './payRollTransaction';
export default {
  Query: fromQuery,
  Mutation: fromMutation,
  Subscription: fromSubscription,
  Appointment: fromAppointment,
  Patient: fromPatient,
  AppointmentField: fromAppointmentField,
  Snippet: fromSnippet,
  PatientSurgery: formPatientSurgery,
  Branch: formBranch,
  Specialty: formSpecialty,
  User: fromUser,
  Role: fromRole,
  Lab: fromLab,
  Image: fromImage,
  PayRollUser: fromPayRoll,
  PayRollTransaction: fromPayRollTransaction,
  ...fromCustomResolvers,
};
