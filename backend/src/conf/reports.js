import { generatePdf } from '@/services/report.service';
import moment from 'moment';
import * as R from 'ramda';
import { prisma } from '..';
import { formatDateStandard } from './../services/date.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

const byAppointmentDate = R.groupBy(function (appointment) {
  const date = formatDateStandard(appointment.date);
  return date;
});

const init = app => {
  app.post('/accounting', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      columns = ['revenues', 'expenses'],
      doctorId,
      specialtyId,
      branchId,
      revenueName,
      expenseBranchId,
      expenseSpecialtyId,
      expenseDoctorId,
      expenseType,
      organizationId,
      expenseName,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const revenues = await prisma.revenue.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: revenueName,
            mode: 'insensitive',
          },
        },
      });
      const expenses = await prisma.expense.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: expenseBranchId,
            },
            {
              specialtyId: expenseSpecialtyId,
            },
            {
              doctorId: expenseDoctorId,
            },
          ],
          expenseType: {
            contains: expenseType,
            mode: 'insensitive',
          },
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: expenseName,
            mode: 'insensitive',
          },
        },
      });
      const updatedRevenues = revenues.map(r => {
        return { ...r, date: formatDateStandard(r.date) };
      });
      const updatedExpenses = expenses.map(r => {
        return { ...r, date: formatDateStandard(r.date) };
      });
      const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
      const totalRevenues = revenues.reduce((acc, e) => acc + e.amount, 0);
      const profit = totalRevenues - totalExpenses;
      const pdfDoc = await generatePdf('/views/reports/accounting.ejs', {
        revenues: updatedRevenues,
        expenses: updatedExpenses,
        showRevenues: columns.includes('revenues'),
        showExpenses: columns.includes('expenses'),
        totalExpenses,
        totalRevenues,
        profit,
        from: formatDateStandard(updatedDateFrom),
        to: formatDateStandard(updatedDateTo),
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post('/bankAccountingReport', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      revenueName,
      expenseBranchId,
      expenseSpecialtyId,
      expenseDoctorId,
      expenseType,
      bankId,
      columns = ['revenues', 'expenses'],
      organizationId,
      expenseName,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const revenues = await prisma.bankRevenue.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              bankId: bankId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: revenueName,
            mode: 'insensitive',
          },
        },
      });
      const expenses = await prisma.bankExpense.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: expenseBranchId,
            },
            {
              specialtyId: expenseSpecialtyId,
            },
            {
              doctorId: expenseDoctorId,
            },
            {
              bankId: bankId,
            },
          ],
          expenseType: {
            contains: expenseType,
            mode: 'insensitive',
          },
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: expenseName,
            mode: 'insensitive',
          },
        },
      });
      const updatedRevenues = revenues.map(r => {
        return { ...r, date: formatDateStandard(r.date) };
      });
      const updatedExpenses = expenses.map(r => {
        return { ...r, date: formatDateStandard(r.date) };
      });
      const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
      const totalRevenues = revenues.reduce((acc, e) => acc + e.amount, 0);
      const profit = totalRevenues - totalExpenses;
      const pdfDoc = await generatePdf('/views/reports/accounting.ejs', {
        revenues: updatedRevenues,
        expenses: updatedExpenses,
        showRevenues: columns.includes('revenues'),
        showExpenses: columns.includes('expenses'),
        totalExpenses: totalExpenses,
        totalRevenues: totalRevenues,
        profit: profit,
        from: formatDateStandard(updatedDateFrom),
        to: formatDateStandard(updatedDateTo),
      });
      const fileName = 'accounting-visa.pdf';
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  // insurrance report

  app.post('/insurranceReport', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      companyId,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const insurranceRevenues = await prisma.insuranceRevenue.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              companyId: companyId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
        },
      });

      const totalRevenues = insurranceRevenues.reduce(
        (acc, e) => acc + e.amount,
        0
      );
      const pdfDoc = await generatePdf('/views/reports/insurrance.ejs', {
        revenues: insurranceRevenues,
        totalRevenues: totalRevenues,
        formatDateStandard: formatDateStandard,
        updatedDateFrom,
        updatedDateTo,
      });
      const fileName = 'insurrance.pdf';
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  app.get('/salesPrintReport', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      itemId,
      creatorId,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const sales = await prisma.sales.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              salesDefinitionId: itemId,
            },
            {
              userId: creatorId,
            },
          ],

          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
        },
        include: {
          salesDefinition: true,
        },
      });
      const totalSales = await prisma.sales.aggregate({
        _sum: {
          totalPrice: true,
          totalCost: true,
        },
        _count: {
          id: true,
        },
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              salesDefinitionId: itemId,
            },
            {
              userId: creatorId,
            },
          ],

          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
        },
      });
      const totalPrice = totalSales._sum.totalPrice;
      const totalCost = totalSales._sum.totalCost;
      const salesCount = totalSales._count.id;
      const updatedSales = sales.map(s => {
        return { ...s, date: formatDateStandard(s.date) };
      });
      const pdfDoc = await generatePdf('/views/reports/sales.ejs', {
        totalPrice: totalPrice,
        totalCost: totalCost,
        salesCount: salesCount,
        sales: updatedSales,
        from: formatDateStandard(updatedDateFrom),
        to: formatDateStandard(updatedDateTo),
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  
  ///doctorFeesReport

  ///excel
  app.get('/accountingRevenueExcel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      revenueName,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const revenues = await prisma.revenue.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: revenueName,
            mode: 'insensitive',
          },
        },
      });
      let keys = ['name', 'date', 'amount'];
      const workbook = generateExcel(keys, revenues);
      var fileName = 'Revenues.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  app.get('/accountingExpenseExcel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      expenseBranchId,
      expenseSpecialtyId,
      expenseDoctorId,
      expenseType,
      expenseName,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const expenses = await prisma.expense.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: expenseBranchId,
            },
            {
              specialtyId: expenseSpecialtyId,
            },
            {
              doctorId: expenseDoctorId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: expenseName,
            mode: 'insensitive',
          },
          expenseType: {
            contains: expenseType,
            mode: 'insensitive',
          },
        },
      });
      let keys = ['name', 'date', 'amount'];
      const workbook = generateExcel(keys, expenses);
      var fileName = 'Revenues.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  ///bankExcel
  app.get('/accountingBankRevenueExcel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      revenueName,
      bankId,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const revenues = await prisma.bankRevenue.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              bankId: bankId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: revenueName,
            mode: 'insensitive',
          },
        },
      });
      let keys = ['name', 'date', 'amount'];
      const workbook = generateExcel(keys, revenues);
      var fileName = 'Revenues.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  app.get('/accountingBankExpenseExcel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      expenseBranchId,
      expenseSpecialtyId,
      expenseDoctorId,
      expenseType,
      expenseName,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const expenses = await prisma.bankExpense.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: expenseBranchId,
            },
            {
              specialtyId: expenseSpecialtyId,
            },
            {
              doctorId: expenseDoctorId,
            },
            {
              bankId: bankId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          name: {
            contains: expenseName,
            mode: 'insensitive',
          },
          expenseType: {
            contains: expenseType,
            mode: 'insensitive',
          },
        },
      });
      let keys = ['name', 'date', 'amount'];
      const workbook = generateExcel(keys, expenses);
      var fileName = 'Revenues.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  ///salesExcel
  app.get('/salesExcel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      itemId,
      creatorId,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }

      const sales = await prisma.sales.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              salesDefinitionId: itemId,
            },
            {
              userId: creatorId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
        },
        include: {
          salesDefinition: true,
        },
      });
      const updatedSales = sales.map(s => {
        return { ...s, name: s.salesDefinition.name };
      });
      let keys = ['name', 'date', 'quantity', 'totalPrice', 'totalCost'];
      const workbook = generateExcel(keys, updatedSales);
      var fileName = 'sales.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });
  ////

  app.get('/monthly', async (req, res) => {
    const { month } = req.query;
    const endOfMonth = moment(month).clone().endOf('month').toDate();
    const monthName = moment(month).format('MMMM YYYY');

    const revenue = await prisma.revenue.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const revenues = revenue._sum.amount === null ? 0 : revenue.sum.amount;
    const sales = await prisma.sales.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const totalSales =
      sales._sum.totalPrice === null ? 0 : sales.sum.totalPrice;
    const expense = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const expenses = expense._sum.amount === null ? 0 : expense.sum.amount;
    const examinations = await prisma.appointment.findMany({
      where: {
        NOT: {
          // pulses: null,
        },
        type: 'Examination',
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const followups = await prisma.appointment.findMany({
      where: {
        NOT: {
          // pulses: null,
        },
        type: 'Followup',
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const sessions = await prisma.appointment.findMany({
      where: {
        NOT: {
          // pulses: null,
        },
        type: 'Session',
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const courses = await prisma.appointment.findMany({
      where: {
        NOT: {
          // pulses: null,
        },
        type: 'Course',
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const appointments = await prisma.appointment.findMany({
      where: {
        NOT: {
          pulses: null,
        },
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const groupingAppointment = byAppointmentDate(appointments);
    const pulsesControl = await prisma.pulseControl.findMany({
      where: {
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    const data = pulsesControl.map(p => {
      let date = formatDateStandard(p.date);
      let actual = p.after - p.before;
      let numOfPulses = 0;
      let pulses = groupingAppointment[date];
      if (typeof pulses !== 'undefined' && pulses.length != 0) {
        pulses.forEach(pl => {
          numOfPulses += pl.pulses;
        });
        return {
          date: date,
          numOfPulses: numOfPulses,
          before: p.before,
          after: p.after,
          diff: actual - numOfPulses,
        };
      } else {
        return {
          date: date,
          numOfPulses: 0,
          before: p.before,
          after: p.after,
          diff: actual - numOfPulses,
        };
      }
    });
    const numOfExamination = examinations.length,
      numOfFollowup = followups.length,
      numOfSession = sessions.length,
      numOfCourses = courses.length;
    const pdfDoc = {
      totalRevenues: revenues,
      monthName: monthName,
      totalSales: totalSales,
      totalExpenses: expenses,
      numOfExamination: numOfExamination,
      numOfFollowup: numOfFollowup,
      numOfSession: numOfSession,
      numOfCourses: numOfCourses,
      data: data,
    };
    res.json(pdfDoc);
  });

  app.get('/daily', async (req, res) => {
    const { day } = req.query;
    const dayName = moment(day).format('DD-MM-YYYY');
    const endOfDay = moment(day).endOf('day').toDate();
    const startOfDay = moment(day).startOf('day').toDate();
    const appointments = await prisma.appointment.findMany({
      where: {
        NOT: {
          pulses: null,
        },
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        user: true,
        patient: true,
      },
    });
    const data = appointments.map(p => {
      return {
        doctor: p.user.name,
        patient: p.patient.name,
        powerOne: p.powerOne,
        powerTwo: p.powerTwo,
        pulses: p.pulses,
      };
    });
    res.json(data);
  });

  app.post('/logging', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      userId,
      model,
      tagName,
      organizationId,
    } = req.query;
    try {
      const startDay = moment(dateFrom).startOf('day').toDate();
      const endDay = moment(dateTo).endOf('day').toDate();
      const loggings = await prisma.logging.findMany({
        where: Object.assign(
          {
            organizationId,
          },
          dateTo &&
            dateFrom && {
              date: {
                gte: startDay,
                lte: endDay,
              },
            },
          userId && {
            userId: userId,
          },
          model && {
            model: model,
          },
          tagName && {
            tagName: tagName,
          }
        ),
        include: {
          user: true,
        },
      });
      const pdfDoc = await generatePdf('/views/reports/logging.ejs', {
        logging: loggings,
        formatDateStandard: formatDateStandard,
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //insurrance Excel
  app.get('/insurranceExcel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      companyId,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      const revenues = await prisma.insuranceRevenue.findMany({
        where: {
          organizationId,
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              companyId: companyId,
            },
          ],
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
        },
      });
      let keys = ['name', 'date', 'amount'];
      const workbook = generateExcel(keys, revenues);
      var fileName = 'Insurrance-Revenues.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });
};

export default init;
