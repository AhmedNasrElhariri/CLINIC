import { prisma } from '@';

const patients = async (
  _,
  { offset, limit, name, phoneNo },
  { organizationId, user }
) => {
  const patientsCount = await prisma.patient.count({
    where: Object.assign({
      organizationId,
      AND: [
        {
          OR: [
            {
              phoneNo: {
                contains: phoneNo,
              },
            },
            {
              phoneNoTwo: {
                contains: phoneNo,
              },
            },
          ],
        },
        {
          OR: [
            {
              code: {
                contains: name,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
    }),
  });
  const patients = await prisma.patient.findMany({
    where: Object.assign({
      organizationId,
      AND: [
        {
          OR: [
            {
              phoneNo: {
                contains: phoneNo,
              },
            },
            {
              phoneNoTwo: {
                contains: phoneNo,
              },
            },
          ],
        },
        {
          OR: [
            {
              code: {
                contains: name,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
    }),
    skip: offset,
    take: limit,
  });
  const data = { patients: patients, patientsCount: patientsCount };
  return data;
};

export default patients;
