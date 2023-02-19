import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

const mapTypes = (transactions = [], type) =>
  transactions.map(transaction => ({ ...transaction, type }));

const init = app => {
  app.post('/reports/transactions', async (req, res) => {
    const {
      view,
      period,
      branchId,
      specialtyId,
      doctorId,
      name,
      accountingOption = 'cash',
      transactionType,
      bankId,
      organizationId,
    } = req.query;
    try {
      const transactions = [];
      let totalAmount = 0;
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      const dateFrom = period && period[0];
      const dateTo = period && period[1];

      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }

      const accountingOptions = accountingOption
        ? [accountingOption]
        : ['cash', 'visa'];

      const accountingOptionsVsModel = {
        cash: {
          revenue: prisma.revenue.findMany,
          expense: prisma.expense.findMany,
        },
        visa: {
          revenue: prisma.bankRevenue.findMany,
          expense: prisma.bankExpense.findMany,
        },
      };

      if (accountingOptions.includes('cash')) {
        const revenues = await accountingOptionsVsModel['cash'][
          transactionType
        ]({
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
              contains: name,
              mode: 'insensitive',
            },
          },
        });
        transactions.push(...mapTypes(revenues, 'cash'));
      }

      if (accountingOptions.includes('visa')) {
        const bankRevenues = await accountingOptionsVsModel['visa'][
          transactionType
        ]({
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
              contains: name,
              mode: 'insensitive',
            },
          },
        });
        transactions.push(...mapTypes(bankRevenues, 'visa'));
      }

      totalAmount = transactions.reduce((acc, { amount }) => acc + amount, 0);
      transactions.sort((a, b) => b.date - a.date);

      const pdfDoc = await generatePdf('/views/reports/all-accounting.ejs', {
        transactions,
        total: totalAmount,
        from: formatDateStandard(updatedDateFrom),
        to: formatDateStandard(updatedDateTo),
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=cash.pdf');
      res.end(pdfDoc);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });

  ///excel
  app.get('/allAccountingExcel', async (req, res) => {
    const {
      view,
      period,
      branchId,
      specialtyId,
      doctorId,
      name,
      accountingOption,
      transactionType,
      bankId,
      organizationId,
    } = req.query;
    try {
      let updatedDateFrom = new Date();
      let updatedDateTo = new Date();
      let trans = [];
      // let total = 0;
      const dateFrom = period && period[0];
      const dateTo = period && period[1];
      if (dateFrom && dateTo) {
        updatedDateFrom = getStartOfDay(dateFrom);
        updatedDateTo = getEndOfDay(dateTo);
      } else {
        const datesArray = getDateFromAndDateToFromView(view);
        updatedDateFrom = datesArray[0];
        updatedDateTo = datesArray[1];
      }
      if (transactionType === 'revenue') {
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
              contains: name,
              mode: 'insensitive',
            },
          },
        });
        const bankRevenues = await prisma.bankRevenue.findMany({
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
              contains: name,
              mode: 'insensitive',
            },
          },
        });
        const updatedRevenues = revenues.map(r => {
          return { ...r, date: formatDateStandard(r.date), flag: 'cash' };
        });
        const updatedBankRevenues = bankRevenues.map(r => {
          return { ...r, date: formatDateStandard(r.date), flag: 'visa' };
        });
        // const totalBankRevenue = updatedBankRevenues.reduce(
        //   (acc, e) => acc + e.amount,
        //   0
        // );
        // const totalRevenues = revenues.reduce((acc, e) => acc + e.amount, 0);
        if (accountingOption === 'cash') {
          trans = updatedRevenues;
          // total = totalRevenues;
        } else if (accountingOption === 'visa') {
          trans = updatedBankRevenues;
          // total = totalBankRevenue;
        } else {
          trans = [...updatedRevenues, ...updatedBankRevenues];
          // total = totalRevenues + totalBankRevenue;
        }
      } else {
        const expenses = await prisma.expense.findMany({
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
              contains: name,
              mode: 'insensitive',
            },
          },
        });
        const bankExpenses = await prisma.bankExpense.findMany({
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
              contains: name,
              mode: 'insensitive',
            },
          },
        });
        const updatedExpenses = expenses.map(r => {
          return { ...r, date: formatDateStandard(r.date), flag: 'cash' };
        });
        const updatedBankExpeses = bankExpenses.map(r => {
          return { ...r, date: formatDateStandard(r.date), flag: 'visa' };
        });
        // const totalBankExpenses = updatedBankExpeses.reduce(
        //   (acc, e) => acc + e.amount,
        //   0
        // );
        // const totalExpenses = updatedExpenses.reduce(
        //   (acc, e) => acc + e.amount,
        //   0
        // );
        if (accountingOption === 'cash') {
          trans = updatedExpenses;
          // total = totalExpenses;
        } else if (accountingOption === 'visa') {
          trans = updatedBankExpeses;
          // total = totalBankExpenses;
        } else {
          trans = [...updatedExpenses, ...updatedBankExpeses];
          // total = totalExpenses + totalBankExpenses;
        }
      }
      let keys = ['name', 'date', 'amount', 'flag'];

      const workbook = generateExcel(keys, ['accounting'], trans);

      var fileName = 'accounting.xlsx';
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
