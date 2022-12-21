import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

const sales = app => {
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
};

export default sales;
