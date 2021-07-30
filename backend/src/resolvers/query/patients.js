import { prisma } from '@';

const patients = async (
  _,
  { offset, limit, name, phoneNo },
  { user, organizationId }
) => {
  const patientsCount = await prisma.patient.count({
    where: {
      organizationId,
      OR: [
        {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          code: {
            contains: name,
            mode: 'insensitive',
          },
        },
      ],
      phoneNo: {
        contains: phoneNo,
      },
    },
  });
  const patients = await prisma.patient.findMany({
    where: {
      organizationId,
      OR: [
        {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          code: {
            contains: name,
            mode: 'insensitive',
          },
        },
      ],
      phoneNo: {
        contains: phoneNo,
      },
    },
    skip: offset,
    take: limit,
  });
  const data = { patients: patients, patientsCount: patientsCount };
  return data;
};

export default patients;
