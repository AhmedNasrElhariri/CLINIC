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
import {
  createAppointmentInsurranceRevenue,
  createAppointmentRevenueFromInsurranceSessions,
  createAppointmentBankRevenueFromInsurranceSessions,
  createAppointmentInsurranceRevenueFromSessions,
} from '@/services/insurrance.service';
import { CostServices } from '@/services/cost.service';
const archiveAppointment = async (
  _,
  {
    id,
    bank = null,
    company,
    sessions = [],
    option,
    items = [],
    discount = {},
    others = {},
    remaining = 0,
    payOfRemaining = 0,
    date,
    patientName,
    patientId,
    branchId,
    specialtyId,
    userId: userID,
    coupons,
    couponsValue,
    doctorFees,
  },
  { userId, organizationId }
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  if (company.companyId == null) {
    const updatedSessionsTransactions = sessions.map(
      ({ price, number, id }) => {
        return {
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
        };
      }
    );
    await Promise.all(
      updatedSessionsTransactions.map(d => prisma.sessionTransaction.create(d))
    );
    // sessions.forEach(async ({ price, number, id }) => {
    //   await prisma.sessionTransaction.create({
    //     data: {
    //       number,
    //       price,
    //       date: new Date(),
    //       session: {
    //         connect: {
    //           id,
    //         },
    //       },
    //       organization: {
    //         connect: {
    //           id: organizationId,
    //         },
    //       },
    //       user: {
    //         connect: {
    //           id: userId,
    //         },
    //       },
    //     },
    //   });
    // });
  }

  // start of cash accounting
  if (bank == null && company.companyId == null) {
    await createAppointmentRevenue(
      createAppointmentRevenueFromSessions(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID,
        patientId
      )
    );

    if (others.othersName || others.amount > 0) {
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
          },
          patientId && {
            patient: {
              connect: {
                id: patientId,
              },
            },
          }
        ),
        tag: 'revenue from appointment',
      });
    }
    if (payOfRemaining > 0) {
      const pa = await prisma.patient.findUnique({ where: { id: patientId } });
      const N = 'Payment of the patient remaining /' + patientName;
      await prisma.revenue.create({
        data: Object.assign(
          {
            date: new Date(date),
            name: N,
            amount: payOfRemaining,
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
          },
          patientId && {
            patient: {
              connect: {
                id: patientId,
              },
            },
          }
        ),
        tag: 'revenue from appointment',
      });
      await prisma.patient.update({
        data: {
          remainingOfPayment: pa.remainingOfPayment - payOfRemaining,
        },
        where: {
          id: patientId,
        },
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

  // start of bank accounting
  if (bank != null && company.companyId == null) {
    let sub = 0;
    const subRed = sessions.reduce(
      (sum, { price, number }) => sum + number * price,
      0
    );
    sub =
      subRed + others.amount + payOfRemaining - discount.amount - couponsValue;
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
          },
          patientId && {
            patient: {
              connect: {
                id: patientId,
              },
            },
          }
        ),
        tag: 'revenue from appointment',
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
          },
          patientId && {
            patient: {
              connect: {
                id: patientId,
              },
            },
          }
        ),
        tag: 'revenue from appointment',
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
          bank,
          patientId
        )
      );
      if (others.othersName || others.amount > 0) {
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
            },
            patientId && {
              patient: {
                connect: {
                  id: patientId,
                },
              },
            }
          ),
          tag: 'revenue from appointment',
        });
      }
      if (payOfRemaining > 0) {
        const pa = await prisma.patient.findUnique({
          where: { id: patientId },
        });
        const N = 'Payment of the patient remaining /' + patientName;
        await prisma.bankRevenue.create({
          data: Object.assign(
            {
              date: new Date(date),
              name: N,
              amount: payOfRemaining,
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
              bank: {
                connect: {
                  id: bank,
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
            },
            patientId && {
              patient: {
                connect: {
                  id: patientId,
                },
              },
            }
          ),
          tag: 'revenue from appointment',
        });
        await prisma.patient.update({
          data: {
            remainingOfPayment: pa.remainingOfPayment - payOfRemaining,
          },
          where: {
            id: patientId,
          },
        });
      }
    }
  }

  // start of insurrance
  if (company.companyId != null) {
    const { companyId, cardId, paymentMethod, bankId } = company;
    // const finalInsurrancePayment =
    // const totalSessionAmount = sessions.reduce(
    //   (sum, { price, number }) => sum + price * number,
    //   0
    // );
    // const totalAmount =
    //   totalSessionAmount +
    //   others.amount +
    //   payOfRemaining -
    //   discount.amount -
    //   couponsValue;
    // let subtotal = 0;
    // let amount = 0;
    // subtotal = totalAmount - option.amount;
    // amount = option.amount;
    // if (option.option === 'percentage') {
    //   subtotal = totalAmount - option.amount * totalAmount * 0.01;
    //   amount = totalAmount - subtotal;
    // }
    await createAppointmentInsurranceRevenue(
      createAppointmentInsurranceRevenueFromSessions(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID,
        patientId,
        companyId,
        cardId
      )
    );

    if (paymentMethod === 'cash') {
      await createAppointmentRevenue(
        createAppointmentRevenueFromInsurranceSessions(
          userId,
          sessions,
          organizationId,
          branchId,
          date,
          specialtyId,
          userID,
          patientId
        )
      );
    } else {
      await createAppointmentBankRevenue(
        createAppointmentBankRevenueFromInsurranceSessions(
          userId,
          sessions,
          organizationId,
          branchId,
          date,
          specialtyId,
          userID,
          patientId,
          bankId
        )
      );
    }
  }
  // end of insurrancce

  //start of costServices
  await CostServices(
    userId,
    sessions,
    organizationId,
    branchId,
    date,
    specialtyId,
    userID,
    id,
  );
  // ###############################

  // if (doctorFees.fees > 0) {
  //   const { fees, doctorId, doctorName } = doctorFees;
  //   const name = 'Doctor-fees / ' + doctorName;
  //   await prisma.expense.create({
  //     data: Object.assign(
  //       {
  //         date: new Date(date),
  //         name: name,
  //         expenseType: 'Doctor',
  //         amount: fees,
  //         level,
  //         organization: {
  //           connect: {
  //             id: organizationId,
  //           },
  //         },
  //         user: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //       specialtyId && {
  //         specialty: {
  //           connect: {
  //             id: specialtyId,
  //           },
  //         },
  //       },
  //       branchId && {
  //         branch: {
  //           connect: {
  //             id: branchId,
  //           },
  //         },
  //       },
  //       userID && {
  //         doctor: {
  //           connect: {
  //             id: doctorId,
  //           },
  //         },
  //       }
  //     ),
  //   });
  // }

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
  if (remaining > 0) {
    const pa = await prisma.patient.findUnique({ where: { id: patientId } });
    const N = 'Payment Remaining of the patient/' + patientName;
    await prisma.expense.create({
      data: Object.assign(
        {
          date: new Date(date),
          name: N,
          expenseType: 'Patient',
          amount: remaining,
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
      tag: 'expense from appointment',
    });
    await prisma.patient.update({
      data: {
        remainingOfPayment: pa.remainingOfPayment + remaining,
      },
      where: {
        id: patientId,
      },
    });
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

  const configuration = await prisma.configuration.findUnique({
    where: { organizationId },
  });
  if (configuration && configuration.enableInvoiceCounter) {
    const existedOrganization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });
    const newInvoiceCounter = existedOrganization.invoiceCounter + 1;
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        invoiceCounter: newInvoiceCounter,
      },
    });
  }
  return appointment;
};

export default archiveAppointment;
