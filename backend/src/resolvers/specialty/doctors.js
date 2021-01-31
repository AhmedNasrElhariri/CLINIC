import { prisma } from '@';

const doctors = async ({ id }) => {
  return prisma.specialty
    .findOne({ where: { id } })
    .userSpecialties({ include: { user: true } })
    .then(susers => susers.map(su => su.user));
};

export default doctors;
