import { prisma } from '@';
import * as R from 'ramda';
import { APIExceptcion } from '@/services/erros.service';

const addSpecialty = async (_, { branchId, specialtyId }) => {
  const persistedBranch = await prisma.branch.findOne({
    where: { id: branchId },
    include: { specialties: true },
  });
  const specialty = await prisma.specialty.findOne({
    where: { id: specialtyId },
  });
  const specialties = persistedBranch.specialties;
  const alreadyExist = specialties.some(s => s.id === specialty.id);

  if (alreadyExist) {
    throw new APIExceptcion('Already existed');
  }

  console.log(R.map(R.pick(['id']))([...specialties, specialty]));

  return prisma.branch.update({
    data: {
      specialties: {
        connect: R.map(R.pick(['id']))([...specialties, specialty]),
      },
    },
    where: {
      id: branchId,
    },
  });
};

export default addSpecialty;
