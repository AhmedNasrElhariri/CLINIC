import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

const visa = app => {
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

  ///bankExcel
  app.get('/accountingBankExcel', async (req, res) => {
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
      let keys = ['name', 'date', 'amount'];
      const workbook =
        columns.includes('revenues') && columns.includes('expenses')
          ? generateExcel(keys, ['Revenues', 'Expenses'], revenues, expenses)
          : columns.includes('revenues')
          ? generateExcel(keys, ['Revenues'], revenues)
          : generateExcel(keys, ['Expenses'], expenses);
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
};

export default visa;
