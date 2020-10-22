import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';
import * as R from 'ramda';

const patients = async (_, __, { organizationId }) => {
  if (R.isNil(organizationId)) {
    throw new APIExceptcion('Not authroized');
  }
  return prisma.patient.findMany({
    where: {
      organizationId,
    },
  });
};

export default patients;
