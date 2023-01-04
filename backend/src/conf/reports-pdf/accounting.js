import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

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
      res.setHeader('Content-Disposition', 'attachment; filename=cash.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
    }
  });

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
};

export default init;
