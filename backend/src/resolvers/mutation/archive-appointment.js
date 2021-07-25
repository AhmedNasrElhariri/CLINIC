import { prisma } from '@';
import {
  createAppointmentRevenue,
  createAppointmentRevenueFromSessions,
} from '@/services/revenue.service';
import { GetLevel } from '@/services/get-level';
import { createAppointmentExpense } from '@/services/expense.service';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';

const archiveAppointment = async (
  _,
  {
    id,
    bank = null,
    company = null,
    sessions = [],
    option,
    items = [],
    discount = {},
    others = {},
    date,
    patientName,
    branchId,
    specialtyId,
    userId: userID,
  },
  { userId, organizationId }
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  if (bank == null && company == null) {
    await createAppointmentRevenue(
      createAppointmentRevenueFromSessions(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID
      )
    );

    if (others.amount > 0) {
      await prisma.revenue.create({
        data: Object.assign(
          {
            name: others.name,
            date: new Date(date),
            amount: others.amount,
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
          },
          userID && {
            doctor: {
              connect: {
                id: userID,
              },
            },
          }
        ),
      });
    }
    if (discount) {
      await createAppointmentExpense(
        userId,
        discount,
        organizationId,
        branchId,
        specialtyId,
        date,
        userID,
        level
      );
    }
  }
  if (bank != null && company == null) {
    let sub = 0;
    const subRed = sessions.reduce(
      (sum, { price, number }) => sum + number * price,
      0
    );
    sub = subRed + others.amount - discount.amount;
    const name = 'Bank Payment - ' + patientName;
    await prisma.bankRevenue.create({
      data: Object.assign(
        {
          date: new Date(date),
          name,
          amount: sub,
          level,
          organization: {
            connect: {
              id: organizationId,
            },
          },
          bank: {
            connect: {
              id: bank,
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
        },
        userID && {
          doctor: {
            connect: {
              id: userID,
            },
          },
        }
      ),
    });
  }
  if (company != null) {
    const totalSessionAmount = sessions.reduce(
      (sum, { price, number }) => sum + price * number,
      0
    );
    const totalAmount = totalSessionAmount + others.amount - discount.amount;
    let subtotal = 0;
    let amount = 0;
    subtotal = totalAmount - option.amount;
    amount = option.amount;
    if (option.option === 'percentage') {
      subtotal = totalAmount - option.amount * totalAmount * 0.01;
      amount = totalAmount - subtotal;
    }
    if (bank == null) {
      await prisma.revenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name: 'Cash Payment - ' + patientName,
            amount: amount,
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
          },
          userID && {
            doctor: {
              connect: {
                id: userID,
              },
            },
          }
        ),
      });
      await prisma.insuranceRevenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name: 'insurance Payment - ' + patientName,
            amount: subtotal,
            level,
            organization: {
              connect: {
                id: organizationId,
              },
            },
            company: {
              connect: {
                id: company,
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
          },
          userID && {
            doctor: {
              connect: {
                id: userID,
              },
            },
          }
        ),
      });
    } else {
      await prisma.bankRevenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name: 'Bank Payment - ' + patientName,
            amount: amount,
            level,
            organization: {
              connect: {
                id: organizationId,
              },
            },
            bank: {
              connect: {
                id: bank,
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
          },
          userID && {
            doctor: {
              connect: {
                id: userID,
              },
            },
          }
        ),
      });
      await prisma.insuranceRevenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name: 'insurance Payment - ' + patientName,
            amount: subtotal,
            level,
            organization: {
              connect: {
                id: organizationId,
              },
            },
            company: {
              connect: {
                id: company,
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
          },
          userID && {
            doctor: {
              connect: {
                id: userID,
              },
            },
          }
        ),
      });
    }
  }
  const appointment = await prisma.appointment.update({
    data: { accounted: true },
    where: { id },
  });
  await updatedUsedMaterials(organizationId, items);

  await createSubstractHistoryForMultipleItems({
    data: items,
    userId,
    patientId: appointment.patientId,
    organizationId: organizationId,
  });

  // const configuration = await prisma.configuration.findUnique({
  //   where: { organizationId },
  // });
  // if (configuration.enableInvoiceCounter) {
  //   const existedOrganization = await prisma.organization.findUnique({
  //     where: { id: organizationId },
  //   });
  //   const newInvoiceCounter = existedOrganization.invoiceCounter + 1;
  //   await prisma.organization.update({
  //     where: { id: organizationId },
  //     data: {
  //       invoiceCounter: newInvoiceCounter,
  //     },
  //   });
  // }
  return appointment;
};

export default archiveAppointment;
