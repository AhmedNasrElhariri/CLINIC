import * as fromQuery from './query';
import * as fromMutation from './mutation';
import * as fromAppointment from './appointment';
import * as fromPatient from './patient';
import * as fromCustomResolvers from './custom-resolvers';

export default {
  Query: fromQuery,
  Mutation: fromMutation,
  Appointment: fromAppointment,
  Patient: fromPatient,
  ...fromCustomResolvers,
};
