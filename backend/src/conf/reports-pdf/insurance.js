import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

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
};

export default init;
