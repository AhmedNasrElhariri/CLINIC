import { prisma } from '@';
import {
  createAppointmentRevenue,
  createAppointmentRevenueFromSessions,
  createAppointmentBankRevenue,
  createAppointmentBankRevenueFromSessions,
} from '@/services/revenue.service';
import { GetLevel } from '@/services/get-level';
import { createAppointmentExpense } from '@/services/expense.service';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';
import {
  couponService,
  couponAccounting,
  updateCoupons,
} from '@/services/coupon.service';

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
    patientId,
    branchId,
    specialtyId,
    userId: userID,
    coupons,
    couponsValue,
  },
  { userId, organizationId }
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  if (company == null) {
    sessions.forEach(async ({ price, number, id }) => {
      await prisma.sessionTransaction.create({
        data: {
          number,
          price,
          date: new Date(),
          session: {
            connect: {
              id,
            },
          },
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
      });
    });
  }
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
    if (discount && discount.amount > 0) {
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
    sub = subRed + others.amount - discount.amount - couponsValue;
    const name = 'Bank Payment - ' + patientName;
    if (option.amount > 0 || couponsValue > 0) {
      let cashAmount = option.amount;
      let bankAmount = 0;
      if (option.option === 'percentage') {
        cashAmount = option.amount * sub * 0.01;
      }
      bankAmount = sub - cashAmount;
      await prisma.revenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name: 'Cash Payment - ' + patientName,
            amount: cashAmount,
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
      await prisma.bankRevenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name,
            amount: bankAmount,
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
    } else {
      ///
      await createAppointmentBankRevenue(
        createAppointmentBankRevenueFromSessions(
          userId,
          sessions,
          organizationId,
          branchId,
          date,
          specialtyId,
          userID,
          bank
        )
      );
      if (others.amount > 0) {
        await prisma.bankRevenue.create({
          data: Object.assign(
            {
              date: new Date(date),
              name: others.name,
              amount: others.amount - discount.amount,
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
      // await prisma.bankRevenue.create({
      //   data: Object.assign(
      //     {
      //       date: new Date(date),
      //       name,
      //       amount: sub,
      //       level,
      //       organization: {
      //         connect: {
      //           id: organizationId,
      //         },
      //       },
      //       bank: {
      //         connect: {
      //           id: bank,
      //         },
      //       },
      //       user: {
      //         connect: {
      //           id: userId,
      //         },
      //       },
      //     },
      //     specialtyId && {
      //       specialty: {
      //         connect: {
      //           id: specialtyId,
      //         },
      //       },
      //     },
      //     branchId && {
      //       branch: {
      //         connect: {
      //           id: branchId,
      //         },
      //       },
      //     },
      //     userID && {
      //       doctor: {
      //         connect: {
      //           id: userID,
      //         },
      //       },
      //     }
      //   ),
      // });
    }
  }
  if (company != null) {
    const totalSessionAmount = sessions.reduce(
      (sum, { price, number }) => sum + price * number,
      0
    );
    const totalAmount =
      totalSessionAmount + others.amount - discount.amount - couponsValue;
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
  if (couponsValue > 0) {
    await updateCoupons(coupons, organizationId);
    if (bank == null && company == null) {
      await couponAccounting(
        userId,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID,
        patientName,
        coupons,
        couponsValue
      );
    }
  }
  await couponService(
    patientId,
    userId,
    sessions,
    discount,
    organizationId,
    branchId,
    date,
    specialtyId,
    userID,
    others,
    patientName,
    couponsValue
  );
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
