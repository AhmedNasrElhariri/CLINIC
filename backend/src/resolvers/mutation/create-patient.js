import { prisma } from '@';
import { where } from 'ramda';
import { getArea } from '../../services/get_Area';
const createPatient = async (
  _,
  { input: patient },
  { userId, organizationId }
) => {
  const { area, ...rest } = patient;
  const areaName = getArea(area);
  const patientData = await prisma.patient.create({
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
  const { codeNumber, id } = patientData;
  return prisma.patient.update({
    data: {
      code: 'cr' + (codeNumber+1000),
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
    where: { id },
  });
};

export default createPatient;
