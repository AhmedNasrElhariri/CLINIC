import * as fromQuery from './query';
import * as fromMutation from './mutation';
import * as fromAppointment from './appointment';
import * as fromPatient from './patient';
import * as fromAppointmentField from './appointment-field/';
import * as fromCustomResolvers from './custom-resolvers';

export default {
  Query: fromQuery,
  Mutation: fromMutation,
  Appointment: fromAppointment,
  Patient: fromPatient,
  AppointmentField: fromAppointmentField,
  ...fromCustomResolvers,
};
