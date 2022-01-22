import { prisma } from '@';
import { getArea } from '../../services/get_Area';
const createPatient = async (
  _,
  { input: patient },
  { userId, organizationId }
) => {
  const { area, name, phoneNo, ...rest } = patient;

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  const { patientCode, id } = organization;
  await prisma.organization.update({
    data: {
      patientCode: patientCode + 1,
    },
    where: {
      id,
    },
  });
  const areaName = area ? getArea(area) : '';

  return prisma.patient.create({
    data: {
      area: areaName,
      code: 'cr' + patientCode,
      name,
      phoneNo,
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
