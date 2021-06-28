import { prisma } from '@';
import * as R from 'ramda';

import {
  createAppointmentRevenue,
  createAppointmentRevenueFromSessions,
  createAppointmentBankRevenue,
  createAppointmentBankRevenueFromSessions,
} from '@/services/revenue.service';
import { createAppointmentExpense } from '@/services/expense.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';
import { updateLabsAfterArchiveAppointment } from '@/services/lab.service';
import { updateImagesAfterArchiveAppointment } from '@/services/image.service';

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
    appPrice = 0,
    others = {},
    patientName,
  },
  { userId, organizationId }
) => {
  const appointment = await prisma.appointment.update({
    data: { status: APPOINTMENTS_STATUS.ARCHIVED },
    where: { id },
    include: {
      labs: true,
      images: true,
    },
  });
  if (bank == null && company == null) {
    await createAppointmentRevenue(
      createAppointmentRevenueFromSessions(userId, sessions, organizationId)
    );
    if (appPrice > 0) {
      await prisma.revenue.create({
        data: {
          name: 'Appointment Price',
          date: new Date(),
          amount: appPrice,
          user: {
            connect: {
              id: userId,
            },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
        },
      });
    }
    if (others.amount > 0) {
      await prisma.revenue.create({
        data: {
          name: others.name,
          date: new Date(),
          amount: others.amount,
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
    }
    if (discount) {
      await createAppointmentExpense(userId, discount, organizationId);
    }
  }
  if (bank != null && company == null) {
    let sub = 0;
    const subRed = sessions.reduce(
      (sum, { price, number }) => sum + number * price,
      0
    );
    sub = subRed + others.amount + appPrice - discount.amount;
    const name = 'Bank Payment - ' + patientName;
    await prisma.bankRevenue.create({
      data: {
        date: new Date(),
        name,
        amount: sub,
        userId,
        bankId: bank,
      },
    });
  }
  if (company != null) {
    const totalSessionAmount = sessions.reduce(
      (sum, { price, number }) => sum + price * number,
      0
    );
    const totalAmount =
      totalSessionAmount + others.amount + appPrice - discount.amount;
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
        data: {
          date: new Date(),
          name: 'Cash Payment - ' + patientName,
          amount: amount,
          user: {
            connect: {
              id: userId,
            },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
        },
      });
      await prisma.insuranceRevenue.create({
        data: {
          date: new Date(),
          name: 'insurance Payment - ' + patientName,
          amount: subtotal,
          user: {
            connect: {
              id: userId,
            },
          },
          company: {
            connect: {
              id: company,
            },
          },
        },
      });
    } else {
      await prisma.bankRevenue.create({
        data: {
          date: new Date(),
          name: 'Bank Payment - ' + patientName,
          amount: amount,
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
      });
      await prisma.insuranceRevenue.create({
        data: {
          date: new Date(),
          name: 'insurance Payment - ' + patientName,
          amount: subtotal,
          user: {
            connect: {
              id: userId,
            },
          },
          company: {
            connect: {
              id: company,
            },
          },
        },
      });
    }
  }

  await updatedUsedMaterials(organizationId, items);

  await createSubstractHistoryForMultipleItems({
    data: items,
    userId,
    patientId: appointment.patientId,
    organizationId: organizationId,
  });

  const { labs, images } = appointment;

  await Promise.all([
    updateLabsAfterArchiveAppointment(R.map(R.prop('id'))(labs)),
    updateImagesAfterArchiveAppointment(R.map(R.prop('id'))(images)),
  ]);

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
