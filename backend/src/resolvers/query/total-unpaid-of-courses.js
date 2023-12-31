import { prisma } from '@';
import { ACTIONS } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
const totalUnpaidOfCourses = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.ViewCourses_Patient,
    },
    true
  );
  const totalPriceOfCourses = await prisma.course.aggregate({
    _sum: {
      price: true,
    },
    where: {
      userId: {
        in: ids,
      },
    },
  });
  const totalPaidOfCourses = await prisma.course.aggregate({
    _sum: {
      paid: true,
    },
    where: {
      userId: {
        in: ids,
      },
    },
  });
  const totalPrice = totalPriceOfCourses._sum.price;
  const totalPaid = totalPaidOfCourses._sum.paid;
  const totalUnpaid = totalPrice - totalPaid;
  return { totalUnpaid: totalUnpaid };
};

export default totalUnpaidOfCourses;
