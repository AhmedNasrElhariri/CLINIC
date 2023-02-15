import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import moment from 'moment';
import { formatDateStandard } from '../../services/date.service';
const init = app => {
  app.post('/todayAppointmentReport', async (req, res) => {
    const { status, branchId, specialtyId, doctorId, patient } = req.query;
    let from = new Date();
    let to = new Date();
    const DAY = new Date();
    const HOUR = DAY.getHours();
    if (HOUR < 3) {
      from = moment(DAY).subtract(1, 'd').startOf('day').toDate();
      to = moment(DAY).endOf('day').toDate();
    } else {
      from = moment(DAY).startOf('day').toDate();
      to = moment(DAY).endOf('day').toDate();
    }
    const finalStatus =
      status === 'Scheduled' ? ['Scheduled', 'Changed'] : [status];
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          AND: [
            {
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
            },
            {
              OR: [
                {
                  patient: {
                    name: {
                      contains: patient,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  patient: {
                    phoneNo: {
                      contains: patient,
                    },
                  },
                },
              ],
            },
          ],
          date: {
            gte: from,
            lte: to,
          },
          status: {
            in: finalStatus,
          },
        },
        orderBy: [
          {
            date: 'asc',
          },
        ],
        include: {
          specialty: true,
          branch: true,
          user: true,
          session: true,
          patient: true,
          doctor: true,
        },
      });
      const pdfDoc = await generatePdf('/views/reports/today-appointment.ejs', {
        appointments: appointments,
        formatDateStandard,
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=cash.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};

export default init;
