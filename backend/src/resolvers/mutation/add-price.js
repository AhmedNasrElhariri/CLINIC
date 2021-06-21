import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const addPrice = async (
  _,
  { price: priceInput },
  { organizationId, userId }
) => {
  const { Apptype, price, branchId, specialtyId } = priceInput;
  const level = GetLevel(branchId, specialtyId, userId);
  return prisma.price.create({
    data: Object.assign(
      {
        Apptype,
        price,
        level,
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
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      }
    ),
  });
};

export default addPrice;
