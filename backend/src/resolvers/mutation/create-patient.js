import { prisma } from '@';
import { getArea } from '../../services/get_Area';
const createPatient = async (
  _,
  { input: patient },
  { userId, organizationId }
) => {
  const { area, name, phoneNo, code, ...rest } = patient;

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
  const updatedPatientCode = 'cr' + patientCode;
  const areaName = area ? getArea(area) : '';
  const finalCode = code ? code : updatedPatientCode;
  return prisma.patient.create({
    data: {
      area: areaName,
      code: finalCode,
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
