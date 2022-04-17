import { prisma } from '@';

const patients = async (
  _,
  { name, organizationId: OrganizationId },
  { user, organizationId }
) => {
  const newOrgId = OrganizationId ? OrganizationId : organizationId;
  console.log(newOrgId,'newOrgIdnewOrgId',name,'namename');
  const patients = await prisma.patient.findMany({
    where: {
      organizationId: newOrgId,
      OR: [
        {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          phoneNoTwo: {
            contains: name,
          },
        },

        {
          phoneNo: {
            contains: name,
          },
        },
      ],
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
    skip: 0,
    take: 20,
  });
  console.log(patients,'patients');
  return patients
};

export default patients;
