import * as fromQuery from './query';
import * as fromMutation from './mutation';
import * as fromSubscription from './subscription';

import * as fromAppointment from './appointment';
import * as fromPatient from './patient';
import * as fromAppointmentField from './appointment-field/';
import * as fromClinic from './clinic';
import * as fromSnippet from './snippet';
import * as fromCollection from './collection';
import * as fromCustomResolvers from './custom-resolvers';
import * as formPatientSurgery from './patient-surgery';
import * as formBranch from './branch';
import * as formSpecialty from './specialty';

export default {
  Query: fromQuery,
  Mutation: fromMutation,
  Subscription: fromSubscription,
  Appointment: fromAppointment,
  Patient: fromPatient,
  AppointmentField: fromAppointmentField,
  Clinic: fromClinic,
  Snippet: fromSnippet,
  Collection: fromCollection,
  PatientSurgery: formPatientSurgery,
  Branch: formBranch,
  Specialty: formSpecialty,
  ...fromCustomResolvers,
};
