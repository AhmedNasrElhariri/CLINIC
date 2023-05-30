import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const inventory = async (
  _,
  { doctorId, specialtyId, branchId },
  { organizationId, user }
) => {
  // const ids = await listFlattenUsersTreeIds(
  //   {
  //     user,
  //     organizationId,
  //     action: ACTIONS.View_Inventory,
  //   },
  //   false
  // );
  return prisma.inventoryItem.findMany({
    where: {
      organizationId: organizationId,
      // AND: [
      //   {
      //     OR: [
      //       {
      //         doctorId: {
      //           in: ids,
      //         },
      //       },
      //       {
      //         branchId: {
      //           in: ids,
      //         },
      //       },
      //       {
      //         specialtyId: {
      //           in: ids,
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     AND: [
      //       {
      //         branchId: branchId,
      //       },
      //       {
      //         specialtyId: specialtyId,
      //       },
      //       {
      //         doctorId: doctorId,
      //       },
      //     ],
      //   },
      // ],
      branchId,
      specialtyId,
      doctorId,
    },
    include: {
      user: true,
      branch: true,
      specialty: true,
      item: true,
      doctor: true,
    },
  });
};

export default inventory;
