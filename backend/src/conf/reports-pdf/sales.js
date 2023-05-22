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
      console.log(
        dateFrom,
        'dd',
        dateTo,
        view,
        doctorId,
        specialtyId,
        branchId,
        itemId,
        creatorId,
        organizationId
      );
      const sales = await prisma.inventoryHistory.findMany({
        where: {
          organizationId,
          operation: 'Sell',
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
              itemId: itemId,
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
          item: true,
          user: true,
        },
      });
      const totalSales = await prisma.inventoryHistory.aggregate({
        _sum: {
          totalPrice: true,
        },
        _count: {
          id: true,
        },
        where: {
          organizationId,
          operation: 'Sell',
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
              itemId: itemId,
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
      console.log(totalSales);
      const totalPrice = totalSales._sum.totalPrice;
      const salesCount = totalSales._count.id;
      const updatedSales = sales.map(s => {
        return { ...s, date: formatDateStandard(s.date) };
      });
      console.log(sales, 'SSaa', 'in');
      const pdfDoc = await generatePdf('/views/reports/sales.ejs', {
        totalSalesPrice: totalPrice,
        salesCount: salesCount,
        sales: updatedSales,
        from: formatDateStandard(updatedDateFrom),
        to: formatDateStandard(updatedDateTo),
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e.message);
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

      const sales = await prisma.inventoryHistory.findMany({
        where: {
          organizationId,
          operation: 'Sell',
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
              itemId: itemId,
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
          item: true,
          user: true,
        },
      });
      const updatedSales = sales.map(s => {
        return { ...s, name: s.item.name, creator: s.user.name };
      });
      let keys = ['date', 'name', 'creator', 'quantity', 'totalPrice'];
      const workbook = generateExcel(keys, 'sales', updatedSales);
      var fileName = 'sales.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e.message);
      res.status(400).send('Invalid');
    }
  });
  ////
};

export default sales;
