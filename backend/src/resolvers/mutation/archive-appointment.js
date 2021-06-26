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
    discount = 0,
    appPrice = 0,
    others = 0,
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
  if (option.payMethod === 'cash' && company == null) {
    await createAppointmentRevenue(
      createAppointmentRevenueFromSessions(userId, sessions)
    );
  }
  if (appPrice > 0 ) {
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
      },
    });
  }
  if (option.payMethod === 'visa' && company == null) {
    await createAppointmentBankRevenue(
      createAppointmentBankRevenueFromSessions(userId, bank, sessions)
    );
  }
  if (company != null) {
    const totalAmount = sessions.reduce(
      (sum, { price, number }) => sum + price * number,
      0
    );
    let subtotal = 0;
    let amount = 0;
    if (option.payMethod === 'cash') {
      subtotal = totalAmount - option.amount;
      amount = option.amount;
      if (option.option === 'percentage') {
        subtotal = totalAmount - option.amount * totalAmount * 0.01;
        amount = totalAmount - subtotal;
      }
      await prisma.revenue.create({
        data: {
          date: new Date(),
          name: 'Cash Payment',
          amount: amount,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      await prisma.insuranceRevenue.create({
        data: {
          date: new Date(),
          name: 'insurance Payment',
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
      subtotal = totalAmount - option.amount;
      amount = option.amount;
      if (option.option === 'percentage') {
        subtotal = totalAmount - option.amount * totalAmount * 0.01;
        amount = option.amount * totalAmount * 0.01;
      }
      await prisma.bankRevenue.create({
        data: {
          date: new Date(),
          name: 'Bank Payment',
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
          name: 'insurance Payment',
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

  if (others) {
    await prisma.revenue.create({
      data: {
        name: 'Others',
        date: new Date(),
        amount: others,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  if (discount) {
    await createAppointmentExpense(
      userId,
      discount,
    );
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

  const configuration = await prisma.configuration.findUnique({
    where: { organizationId },
  });
  if (configuration.enableInvoiceCounter) {
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
