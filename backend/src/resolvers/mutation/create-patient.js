import { prisma } from '@';
import { getArea } from '../../services/get_Area';
const createPatient = (_, { input: patient }, { userId, organizationId }) => {
  const { area, ...rest } = patient;
  const areaName = getArea(area);
  return prisma.patient.create({
    data: {
      area: areaName,
      ...rest,
      organization: {
        connect: {
          id: organizationId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default createPatient;
