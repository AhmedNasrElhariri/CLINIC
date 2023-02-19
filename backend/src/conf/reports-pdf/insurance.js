import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { generateExcel } from '@/services/generate-excel-sheet';

const init = app => {
  app.post('/reports/insurance', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      view,
      doctorId,
      specialtyId,
      branchId,
      companyId,
      organizationId,
      status,
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
      const transactions = await prisma.insuranceRevenue.findMany({
        where: {
          organizationId,
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          status,
          AND: [
            {
              doctorId,
            },
            {
              branchId,
            },
            {
              specialtyId,
            },
            {
              companyId,
            },
          ],
        },
        include: {
          company: true,
          user: true,
          branch: true,
          specialty: true,
          doctor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalAmount = transactions.reduce((acc, e) => acc + e.amount, 0);
      const pdfDoc = await generatePdf('/views/reports/insurance.ejs', {
        transactions,
        totalAmount,
        from: formatDateStandard(updatedDateFrom),
        to: formatDateStandard(updatedDateTo),
        formatDateStandard,
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=transactions.pdf'
      );
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  ///excel insurance
  app.get('/insurance/excel', async (req, res) => {
    const {
      branchId,
      specialtyId,
      doctorId,
      companyId,
      organizationId,
      view,
      status,
      dateFrom,
      dateTo,
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
      let transactions = await prisma.insuranceRevenue.findMany({
        where: {
          organizationId,
          date: {
            gte: updatedDateFrom,
            lte: updatedDateTo,
          },
          status,
          AND: [
            {
              doctorId,
            },
            {
              branchId,
            },
            {
              specialtyId,
            },
            {
              companyId,
            },
          ],
        },
        include: {
          company: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      let keys = ['name', 'amount', 'companyName', 'cardId', 'date'];
      transactions = transactions.map(t => ({
        ...t,
        companyName: t.company.name,
      }));
      const workbook = generateExcel(keys, ['insurance'], transactions);
      var fileName = 'insurance.xlsx';
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
