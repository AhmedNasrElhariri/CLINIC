import * as fromQuery from './query';
import * as fromMutation from './mutation';
import * as fromSubscription from './subscription';

import * as fromAppointment from './appointment';
import * as fromPatient from './patient';
import * as fromAppointmentField from './appointment-field/';
import * as fromSnippet from './snippet';
import * as fromCollection from './collection';
import * as fromCustomResolvers from './custom-resolvers';
import * as formPatientSurgery from './patient-surgery';
import * as formBranch from './branch';
import * as formSpecialty from './specialty';
import * as fromUser from './user';
import * as fromRole from './role';
import * as fromLabDocument from './lab-document';
import * as fromImageDocument from './image-document';

export default {
  Query: fromQuery,
  Mutation: fromMutation,
  Subscription: fromSubscription,
  Appointment: fromAppointment,
  Patient: fromPatient,
  AppointmentField: fromAppointmentField,
  Snippet: fromSnippet,
  Collection: fromCollection,
  PatientSurgery: formPatientSurgery,
  Branch: formBranch,
  Specialty: formSpecialty,
  User: fromUser,
  Role: fromRole,
  LabDocument: fromLabDocument,
  ImageDocument: fromImageDocument,
  ...fromCustomResolvers,
};
