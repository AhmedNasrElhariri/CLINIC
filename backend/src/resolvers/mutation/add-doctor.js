import * as R from 'ramda';

import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const validateBeforeAdd = async ({ userId, specialtyId, branchId }) => {
  const specialty = await prisma.specialty.findMany({
    where: { id: specialtyId, branches: { some: { id: branchId } } },
  });

  if (!specialty.length) {
    return 'Invalid Branch and Specialty combination';
  }

  const userspecialties = await prisma.userSpecialty.findMany({
    where: { user: { id: userId } },
    include: { branch: true },
  });
  const mappedBranches = R.map(R.prop('branch'))(userspecialties);
  const mappedBranchesIds = R.map(R.prop('id'))(mappedBranches);
  const alreadyAssignedToBranch =
    mappedBranches.length && mappedBranchesIds.includes(branchId);

  if (alreadyAssignedToBranch) {
    return 'User already assigned to that branch';
  }
};

const addDoctor = async (
  _,
  { branchId, specialtyId, userId },
  { organizationId }
) => {
  return prisma.userSpecialty.create({
    data: {
      branch: {
        connect: { id: branchId },
      },
      specialty: {
        connect: { id: specialtyId },
      },
      user: {
        connect: { id: userId },
      },
      organization: {
        connect: { id: organizationId },
      },
    },
  });
};

export default addDoctor;
